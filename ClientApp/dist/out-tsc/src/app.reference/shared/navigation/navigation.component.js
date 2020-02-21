import { __decorate, __metadata } from "tslib";
import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { AuthService } from '../security/_services';
import { Subscription } from 'rxjs';
import { NavigationService } from './_services';
import { Router } from '@angular/router';
let NavigationComponent = class NavigationComponent {
    constructor(cdr, router, authService, navService) {
        this.cdr = cdr;
        this.router = router;
        this.authService = authService;
        this.navService = navService;
        this.displayName = '';
        this.showSidebar = false;
        this.showExpanded = false;
        this._isLoggedIn = false;
        this.subscription = new Subscription();
    }
    get isLoggedIn() {
        return this._isLoggedIn;
    }
    check() {
        this.cdr.markForCheck();
    }
    ngOnInit() {
        this._isLoggedIn = this.authService.isAuthenticated(false); //Ignore expiration. Could have started session after access token expired (Will be renewed if possible).
        this.setAuthValues();
        this.subscription.add(this.authService.auth_changed.subscribe((isLoggedIn) => {
            this._isLoggedIn = isLoggedIn;
            if (!isLoggedIn)
                this.router.navigate(['account/login']);
            this.setAuthValues();
        }));
        this.subscription.add(this.authService.password_expired.subscribe(() => {
            console.log("Password Expired");
        }));
        this.subscription.add(this.navService.visiblity_changed.subscribe(() => this.check()));
    }
    ngOnDestroy() {
        if (!this.subscription.closed)
            this.subscription.unsubscribe();
    }
    isAuthorized(allowedRoles) {
        return this.authService.isAuthorized(allowedRoles);
    }
    logout() {
        this.authService.logout();
    }
    toggleExpanded(state) {
        if (state)
            this.showExpanded = state;
        this.showExpanded = !this.showExpanded;
    }
    toggleSidebar(state) {
        if (state)
            this.showSidebar = state;
        this.showSidebar = !this.showSidebar;
        if (!this.showSidebar)
            this.showExpanded = false;
    }
    setAuthValues() {
        if (this.isLoggedIn)
            this.displayName = this.authService.getTokenValue('unique_name');
        else
            this.displayName = "SSO User";
        this.check();
    }
};
NavigationComponent = __decorate([
    Component({
        selector: 'app-navigation',
        templateUrl: './navigation.component.html',
        styleUrls: ['./navigation.component.scss'],
        changeDetection: ChangeDetectionStrategy.OnPush
    }),
    __metadata("design:paramtypes", [ChangeDetectorRef, Router, AuthService, NavigationService])
], NavigationComponent);
export { NavigationComponent };
//# sourceMappingURL=navigation.component.js.map