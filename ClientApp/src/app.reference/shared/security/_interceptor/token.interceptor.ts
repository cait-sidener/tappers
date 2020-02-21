import { Injectable, Inject } from '@angular/core';
import { Observable, throwError, defer } from 'rxjs';
import { HttpInterceptor, HttpHandler, HttpEvent, HttpRequest, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { AuthService } from '../../security/_services/auth.service';
import { catchError, switchMap, tap } from 'rxjs/operators';

@Injectable({
	providedIn: 'root' //Singleton
})
export class TokenInterceptor implements HttpInterceptor {
	constructor(private authService: AuthService, @Inject('BASE_URL') private baseUrl: string) { }

	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		const excludes: string[] = [
			"ADprovider/api/Account/GenerateOTP", //Currently on the same domain (IIS), this prevents messing with default windows auth functionality.
			"api/Account/RenewToken"
		]
		let isExcluded: boolean = false;
		if (request.url.search(this.baseUrl) === -1) isExcluded = true; //Don't sent if not within the same domain.
		else excludes.forEach(string => { //Check if url contains any excluded routes.
			if (request.url.search(string) !== -1) isExcluded = true;
		});
		if (this.authService.isAuthenticated && !isExcluded) {
			const authHandle = defer(() => { //Creates a new Observable when subscribed.
				const
					storageItem: any = this.authService.getStorageItem(), //Retreive fresh copy of tokens.
					authRequest = request.clone({
						setHeaders: {
							Authorization: `Bearer ${storageItem && storageItem.accessToken}`
						}
					});
				return next.handle(authRequest);
			});
			return authHandle.pipe(
				tap((event: HttpEvent<any>) => {
					if (event instanceof HttpResponse)
						this.authService.password_expired.emit();
				}),
				catchError((error: HttpErrorResponse, retry: Observable<HttpEvent<any>>) => { //'retry' is still the same as 'authHandle'.
					if (error.status === 401) {
						if (error.headers.has('Token-Expired'))
							return this.authService.renewTokens().pipe( //Renew token using stored refresh token.
								switchMap(() => retry) //Retry original request.
							);
						else this.authService.logout();
					}
					return throwError(error);
				}),
				catchError((error: HttpErrorResponse) => { //If token renewal or retry attempt fails. Will logout if failed automatically.
					return throwError(error);
				})
			);
		} else return next.handle(request);
	}
}
