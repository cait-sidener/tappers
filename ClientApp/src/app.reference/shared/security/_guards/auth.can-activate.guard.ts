import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, UrlTree, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from '../_services/auth.service';
import { map, catchError } from 'rxjs/operators';

@Injectable({
	providedIn: 'root' //Singleton
})
export class AuthCanActivateGuard implements CanActivate {
	constructor(private router: Router, private authService: AuthService) { }

	canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
		let allowedRoles = next.data.roles as Array<string>;
		if (this.authService.isAuthenticated(false)) { //Don't take into account the exp.
			if (!this.authService.isAuthenticated()) { //Access token expired; needs renewed.
				return this.authService.renewTokens().pipe( //Renew token using stored refresh token.
					map(() => true),
					catchError(() => {
						this.router.navigate(['account/login']);
						return of(false);
					})
				);
			}
			if (allowedRoles) {
				if (this.authService.isAuthorized(allowedRoles)) return true;
				else {
					this.router.navigate(['unauthorized']);
					return false;
				}
			} else return true;
		} else {
			this.router.navigate(['account/login']);
			return false;
		}
	}
}
