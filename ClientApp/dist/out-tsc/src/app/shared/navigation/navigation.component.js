import { __decorate, __metadata } from "tslib";
import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { NavigationService } from './_services';
import { Router } from '@angular/router';
let NavigationComponent = class NavigationComponent {
    constructor(cdr, router, navService) {
        this.cdr = cdr;
        this.router = router;
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
        this.subscription.add(this.navService.visiblity_changed.subscribe(() => this.check()));
    }
    ngOnDestroy() {
        if (!this.subscription.closed)
            this.subscription.unsubscribe();
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
};
NavigationComponent = __decorate([
    Component({
        selector: 'app-navigation',
        templateUrl: './navigation.component.html',
        styleUrls: ['./navigation.component.scss'],
        changeDetection: ChangeDetectionStrategy.OnPush
    }),
    __metadata("design:paramtypes", [ChangeDetectorRef, Router, NavigationService])
], NavigationComponent);
export { NavigationComponent };
//# sourceMappingURL=navigation.component.js.map