import { __decorate, __metadata, __param } from "tslib";
import { Injectable, Inject, EventEmitter, Output } from '@angular/core';
import { throwError, of, defer, Subscription, interval } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError, map, switchMap, share, tap } from 'rxjs/operators';
import { StorageService } from '../../_services';
import { JwtHelperService } from '@auth0/angular-jwt';
const jwtHelper = new JwtHelperService();
let AuthService = class AuthService {
    constructor(http, storageService, baseUrl, adProviderUrl, appID) {
        this.http = http;
        this.storageService = storageService;
        this.baseUrl = baseUrl;
        this.adProviderUrl = adProviderUrl;
        this.appID = appID;
        this.auth_changed = new EventEmitter(true); //Async; Doesn't need to wait.
        this.password_expired = new EventEmitter(true); //Async; Doesn't need to wait.
        this.apiUrl = 'api/Account';
        this.storageName = 'SSO_AUTH_DATA';
        this._isListening = false;
        this._userActivityEvents = [
            'mousemove',
            'keydown',
            'click'
        ];
        this.subscription = new Subscription(); //Acts as a container for multiple subscriptions by using the Add function.
        window.addEventListener("storage", (event) => {
            if (event.key === this.storageName)
                this.logout();
        }, false);
        const handler = () => {
            this._isListening = false;
            if (!this.isAuthenticated())
                this.subscription.add(this.renewTokens().subscribe()); //Tokens expired; renew.
            this._userActivityEvents.forEach((event) => {
                document.removeEventListener(event, handler);
            });
        };
        this.subscription.add(interval(5 * 1000).subscribe(() => {
            if (!this._isListening && this.isAuthenticated(false)) {
                this._isListening = true;
                this._userActivityEvents.forEach((event) => {
                    document.addEventListener(event, handler, { passive: true });
                });
            }
        }));
    }
    ngOnDestroy() {
        if (!this.subscription.closed) //CYA; Always unsubscribe on destroy event to prevent memory leaks.
            this.subscription.unsubscribe();
    }
    getStorageItem() {
        return JSON.parse(this.storageService.getItem(this.storageName));
    }
    getTokenValue(key) {
        const storageItem = this.getStorageItem();
        try {
            return jwtHelper.decodeToken(storageItem.accessToken)[key];
        }
        catch (_a) {
            console.log("Access Token Invalid/Modified");
            this.logout();
        }
    }
    isAuthenticated(useExpiration = true) {
        const storageItem = this.getStorageItem();
        if (storageItem) {
            if (useExpiration) {
                console.log('Diff:', this.getTokenValue('exp') - (new Date().getTime() + 1) / 1000);
                console.log('Expired?', this.getTokenValue('exp') < (new Date().getTime() + 1) / 1000);
                return !(this.getTokenValue('exp') < (new Date().getTime() + 1) / 1000); //Check if expired.
            }
            else
                return true;
        }
        return false;
    }
    isAuthorized(allowedRoles) {
        return this.isAuthenticated(false)
            && allowedRoles.some(role => this.getTokenValue("role").includes(role)); //True if any of the user's roles are contained in the allowedRoles.
    }
    getOTP() {
        return this.http.get(new URL(`${this.apiUrl}/GenerateOTP`, this.baseUrl).href, { observe: 'response', responseType: 'text', withCredentials: true }).pipe(//Get OTP from provider
        map((response) => {
            return response.body; //OTP
        }), catchError(this.handleError));
    }
    sendVerificationEmail(email) {
        return this.http.post(new URL(`${this.apiUrl}/SendVerificationEmail`, this.baseUrl).href, {
            email
        }).pipe(map(() => true), catchError(this.handleError));
    }
    changePassword(newPassword, currentPassword) {
        return this.http.post(new URL(`${this.apiUrl}/ChangePassword`, this.baseUrl).href, {
            newPassword,
            currentPassword
        }, { observe: 'response' }).pipe(map((response) => {
            return +response.body;
        }), catchError(this.handleError));
    }
    login(args) {
        return this.http.post(new URL(`${this.apiUrl}/RequestToken`, this.baseUrl).href, {
            appID: this.appID,
            email: args.email,
            password: args.password,
            otp: args.otp
        }, { observe: 'response' }).pipe(map((response) => {
            this.storageService.setItem(this.storageName, JSON.stringify(response.body));
            this.auth_changed.emit(true);
            return true;
        }), catchError(this.handleError));
    }
    loginAD() {
        return this.http.get(new URL('api/Account/GenerateOTP', this.adProviderUrl).href, { observe: 'response', responseType: 'text', withCredentials: true }).pipe(//Get OTP from provider
        map((response) => {
            return response.body; //OTP
        }), switchMap((otp) => {
            return this.http.post(new URL(`${this.apiUrl}/RequestToken`, this.baseUrl).href, {
                appID: this.appID,
                otp
            }, { observe: 'response' }).pipe(map((response) => {
                this.storageService.setItem(this.storageName, JSON.stringify(response.body));
                this.auth_changed.emit(true);
                return true;
            }));
        }), catchError(this.handleError));
    }
    logout() {
        if (this.isAuthenticated(false)) {
            this.storageService.removeItem(this.storageName); //Removes token, effectivly logging the user out.
            this.auth_changed.emit(false);
        }
    }
    renewTokens() {
        if (!this._renewTokens$) {
            this._renewTokens$ = this._renewTokens().pipe(share(), //Allows for multiple calls to share the result. Cold -> Hot
            tap(val => console.log("PIPE:", val)));
        }
        return this._renewTokens$;
    }
    _renewTokens() {
        return defer(() => {
            const storageItem = this.getStorageItem();
            if (storageItem) {
                return this.http.post(new URL(`${this.apiUrl}/RenewToken`, this.baseUrl).href, {
                    appID: this.appID,
                    accessToken: storageItem.accessToken,
                    refreshToken: storageItem.refreshToken
                }, { observe: 'response' }).pipe(map((response) => {
                    this.storageService.setItem(this.storageName, JSON.stringify(response.body));
                    this.auth_changed.emit(true);
                    console.log("Tokens renewed.");
                    return true;
                }), catchError((error) => {
                    console.log("Failed to renew tokens.");
                    this.logout(); //Failed to renew tokens; Logout.
                    return this.handleError(error);
                }));
            }
            else {
                this.logout();
                return of(false);
            }
        });
    }
    handleError(err) {
        let errorMessage = '';
        if (err.error instanceof ErrorEvent)
            errorMessage = `Error: ${err.error.message}.`;
        else
            errorMessage = `Status Code: ${err.status}, Error: ${err.message}.`;
        return throwError(errorMessage);
    }
};
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], AuthService.prototype, "auth_changed", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], AuthService.prototype, "password_expired", void 0);
AuthService = __decorate([
    Injectable({
        providedIn: 'root' //Singleton
    }),
    __param(2, Inject('BASE_URL')), __param(3, Inject('AD_PROVIDER_URL')), __param(4, Inject('APP_ID')),
    __metadata("design:paramtypes", [HttpClient, StorageService, String, String, Number])
], AuthService);
export { AuthService };
//# sourceMappingURL=auth.service.js.map