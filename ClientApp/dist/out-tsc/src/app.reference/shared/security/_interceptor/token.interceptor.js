import { __decorate, __metadata, __param } from "tslib";
import { Injectable, Inject } from '@angular/core';
import { throwError, defer } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { AuthService } from '../../security/_services/auth.service';
import { catchError, switchMap, tap } from 'rxjs/operators';
let TokenInterceptor = class TokenInterceptor {
    constructor(authService, baseUrl) {
        this.authService = authService;
        this.baseUrl = baseUrl;
    }
    intercept(request, next) {
        const excludes = [
            "ADprovider/api/Account/GenerateOTP",
            "api/Account/RenewToken"
        ];
        let isExcluded = false;
        if (request.url.search(this.baseUrl) === -1)
            isExcluded = true; //Don't sent if not within the same domain.
        else
            excludes.forEach(string => {
                if (request.url.search(string) !== -1)
                    isExcluded = true;
            });
        if (this.authService.isAuthenticated && !isExcluded) {
            const authHandle = defer(() => {
                const storageItem = this.authService.getStorageItem(), //Retreive fresh copy of tokens.
                authRequest = request.clone({
                    setHeaders: {
                        Authorization: `Bearer ${storageItem && storageItem.accessToken}`
                    }
                });
                return next.handle(authRequest);
            });
            return authHandle.pipe(tap((event) => {
                if (event instanceof HttpResponse)
                    this.authService.password_expired.emit();
            }), catchError((error, retry) => {
                if (error.status === 401) {
                    if (error.headers.has('Token-Expired'))
                        return this.authService.renewTokens().pipe(//Renew token using stored refresh token.
                        switchMap(() => retry) //Retry original request.
                        );
                    else
                        this.authService.logout();
                }
                return throwError(error);
            }), catchError((error) => {
                return throwError(error);
            }));
        }
        else
            return next.handle(request);
    }
};
TokenInterceptor = __decorate([
    Injectable({
        providedIn: 'root' //Singleton
    }),
    __param(1, Inject('BASE_URL')),
    __metadata("design:paramtypes", [AuthService, String])
], TokenInterceptor);
export { TokenInterceptor };
//# sourceMappingURL=token.interceptor.js.map