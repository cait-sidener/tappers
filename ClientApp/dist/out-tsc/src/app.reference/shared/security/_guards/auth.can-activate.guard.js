import { __decorate, __metadata } from "tslib";
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { AuthService } from '../_services/auth.service';
import { map, catchError } from 'rxjs/operators';
let AuthCanActivateGuard = class AuthCanActivateGuard {
    constructor(router, authService) {
        this.router = router;
        this.authService = authService;
    }
    canActivate(next, state) {
        let allowedRoles = next.data.roles;
        if (this.authService.isAuthenticated(false)) { //Don't take into account the exp.
            if (!this.authService.isAuthenticated()) { //Access token expired; needs renewed.
                return this.authService.renewTokens().pipe(//Renew token using stored refresh token.
                map(() => true), catchError(() => {
                    this.router.navigate(['account/login']);
                    return of(false);
                }));
            }
            if (allowedRoles) {
                if (this.authService.isAuthorized(allowedRoles))
                    return true;
                else {
                    this.router.navigate(['unauthorized']);
                    return false;
                }
            }
            else
                return true;
        }
        else {
            this.router.navigate(['account/login']);
            return false;
        }
    }
};
AuthCanActivateGuard = __decorate([
    Injectable({
        providedIn: 'root' //Singleton
    }),
    __metadata("design:paramtypes", [Router, AuthService])
], AuthCanActivateGuard);
export { AuthCanActivateGuard };
//# sourceMappingURL=auth.can-activate.guard.js.map