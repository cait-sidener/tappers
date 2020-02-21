import { Injectable, Inject, EventEmitter, Output, OnDestroy } from '@angular/core';
import { Observable, throwError, of, defer, Subscription, interval } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { catchError, map, switchMap, share, tap } from 'rxjs/operators';
import { StorageService } from '../../_services';
import { JwtHelperService } from '@auth0/angular-jwt';

const jwtHelper = new JwtHelperService();

@Injectable({
	providedIn: 'root' //Singleton
})
export class AuthService implements OnDestroy {
	@Output() auth_changed: EventEmitter<boolean> = new EventEmitter(true); //Async; Doesn't need to wait.
	@Output() password_expired: EventEmitter<void> = new EventEmitter(true); //Async; Doesn't need to wait.

	readonly apiUrl: string = 'api/Account';
	readonly storageName: string = 'SSO_AUTH_DATA';

	private _renewTokens$?: Observable<boolean>;

	private _isListening: boolean = false;
	readonly _userActivityEvents: string[] = [
		'mousemove',
		'keydown',
		'click'
	];

	private subscription: Subscription = new Subscription(); //Acts as a container for multiple subscriptions by using the Add function.

	constructor(private http: HttpClient, private storageService: StorageService,
		@Inject('BASE_URL') private baseUrl: string, @Inject('AD_PROVIDER_URL') private adProviderUrl: string, @Inject('APP_ID') private appID: number) {
		window.addEventListener("storage", (event: StorageEvent) => { //Help mitigate against malicious sites opened in another window or tab.
			if (event.key === this.storageName)
				this.logout();
		}, false);
		const handler = () => {
			this._isListening = false;
			if (!this.isAuthenticated())
				this.subscription.add(this.renewTokens().subscribe()); //Tokens expired; renew.
			this._userActivityEvents.forEach((event: string) => {
				document.removeEventListener(event, handler);
			});
		};
		this.subscription.add(interval(5 * 1000).subscribe(
			() => {
				if (!this._isListening && this.isAuthenticated(false)) {
					this._isListening = true;
					this._userActivityEvents.forEach((event: string) => {
						document.addEventListener(event, handler, { passive: true });
					});
				}
			}
		));
	}

	ngOnDestroy(): void {
		if (!this.subscription.closed) //CYA; Always unsubscribe on destroy event to prevent memory leaks.
			this.subscription.unsubscribe();
	}

	getStorageItem(): any {
		return JSON.parse(this.storageService.getItem(this.storageName) as string);
	}

	getTokenValue(key: string): any { //Retreive a value from the token, generally used for getting Claims. I.E. 'ClaimTypes.Name' is 'unique_name'.
		const storageItem: any = this.getStorageItem();
		try {
			return jwtHelper.decodeToken(storageItem.accessToken)[key];
		} catch {
			console.log("Access Token Invalid/Modified");
			this.logout();
		}
	}

	isAuthenticated(useExpiration: boolean = true): boolean {
		const storageItem: any = this.getStorageItem();
		if (storageItem) {
			if (useExpiration) {
				console.log('Diff:', this.getTokenValue('exp') - (new Date().getTime() + 1) / 1000);
				console.log('Expired?', this.getTokenValue('exp') < (new Date().getTime() + 1) / 1000);
				return !(this.getTokenValue('exp') < (new Date().getTime() + 1) / 1000); //Check if expired.
			} else return true;
		}
		return false;
	}

	isAuthorized(allowedRoles: string[]): boolean {
		return this.isAuthenticated(false)
			&& allowedRoles.some(role => this.getTokenValue("role").includes(role)); //True if any of the user's roles are contained in the allowedRoles.
	}

	getOTP(): Observable<string> {
		return this.http.get(new URL(`${this.apiUrl}/GenerateOTP`, this.baseUrl).href, { observe: 'response', responseType: 'text', withCredentials: true }).pipe( //Get OTP from provider
			map((response: HttpResponse<any>) => {
				return response.body //OTP
			}),
			catchError(this.handleError)
		);
	}

	sendVerificationEmail(email: string): Observable<boolean> {
		return this.http.post(new URL(`${this.apiUrl}/SendVerificationEmail`, this.baseUrl).href, {
			email
		}).pipe(
			map(() => true),
			catchError(this.handleError)
		);
	}

	changePassword(newPassword: string, currentPassword?: string): Observable<number> {
		return this.http.post(new URL(`${this.apiUrl}/ChangePassword`, this.baseUrl).href, {
			newPassword,
			currentPassword
		}, { observe: 'response' }).pipe(
			map((response: HttpResponse<any>) => {
				return +response.body;
			}),
			catchError(this.handleError)
		);
	}

	login(args: { email?: string, password?: string, otp?: string }): Observable<boolean> {
		return this.http.post(new URL(`${this.apiUrl}/RequestToken`, this.baseUrl).href, {
			appID: this.appID,
			email: args.email,
			password: args.password,
			otp: args.otp
		}, { observe: 'response' }).pipe(
			map((response: HttpResponse<any>) => {
				this.storageService.setItem(this.storageName, JSON.stringify(response.body));
				this.auth_changed.emit(true);
				return true;
			}),
			catchError(this.handleError)
		);
	}

	loginAD(): Observable<boolean> {
		return this.http.get(new URL('api/Account/GenerateOTP', this.adProviderUrl).href, { observe: 'response', responseType: 'text', withCredentials: true }).pipe( //Get OTP from provider
			map((response: HttpResponse<any>) => {
				return response.body //OTP
			}),
			switchMap((otp: string) => {
				return this.http.post(new URL(`${this.apiUrl}/RequestToken`, this.baseUrl).href, { //Send OTP
					appID: this.appID,
					otp
				}, { observe: 'response' }).pipe(
					map((response: HttpResponse<any>) => {
						this.storageService.setItem(this.storageName, JSON.stringify(response.body));
						this.auth_changed.emit(true);
						return true;
					})
				);
			}),
			catchError(this.handleError)
		);
	}

	logout(): void { //TODO; Delete all the user's refresh tokens?
		if (this.isAuthenticated(false)) {
			this.storageService.removeItem(this.storageName); //Removes token, effectivly logging the user out.
			this.auth_changed.emit(false);
		}
	}

	renewTokens(): Observable<boolean> {
		if (!this._renewTokens$) {
			this._renewTokens$ = this._renewTokens().pipe(
				share(), //Allows for multiple calls to share the result. Cold -> Hot
				tap(val => console.log("PIPE:", val))
			);
		}
		return this._renewTokens$;
	}
	private _renewTokens(): Observable<boolean> {
		return defer(() => {
			const storageItem: any = this.getStorageItem();
			if (storageItem) {
				return this.http.post(new URL(`${this.apiUrl}/RenewToken`, this.baseUrl).href, {
					appID: this.appID,
					accessToken: storageItem.accessToken,
					refreshToken: storageItem.refreshToken
				}, { observe: 'response' }).pipe(
					map((response: HttpResponse<any>) => {
						this.storageService.setItem(this.storageName, JSON.stringify(response.body));
						this.auth_changed.emit(true);
						console.log("Tokens renewed.");
						return true;
					}),
					catchError((error) => {
						console.log("Failed to renew tokens.")
						this.logout(); //Failed to renew tokens; Logout.
						return this.handleError(error);
					})
				);
			} else {
				this.logout();
				return of(false);
			}
		});
	}

	private handleError(err: HttpErrorResponse): Observable<never> {
		let errorMessage = '';
		if (err.error instanceof ErrorEvent) errorMessage = `Error: ${err.error.message}.`
		else errorMessage = `Status Code: ${err.status}, Error: ${err.message}.`
		return throwError(errorMessage);
	}
}
