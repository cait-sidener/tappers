import { __decorate, __metadata } from "tslib";
import { Injectable, Output, EventEmitter } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
let NavigationService = class NavigationService {
    constructor(router) {
        this.router = router;
        this.visiblity_changed = new EventEmitter(false);
        this._visible = true;
        this._prevURL = '/';
        this._currURL = '/';
        this.subscription = new Subscription(); //Acts as a container for multiple subscriptions by using the Add function.
        this._currURL = this.router.url;
        this.subscription.add(router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                this._prevURL = this._currURL;
                this._currURL = this.router.url;
            }
        }));
    }
    set visible(value) {
        this._visible = value;
        this.visiblity_changed.emit(value);
    }
    get visible() {
        return this._visible;
    }
    get previousURL() {
        return this._prevURL;
    }
    ngOnDestroy() {
        if (!this.subscription.closed) //CYA; Always unsubscribe on destroy event to prevent memory leaks.
            this.subscription.unsubscribe();
    }
};
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], NavigationService.prototype, "visiblity_changed", void 0);
NavigationService = __decorate([
    Injectable({
        providedIn: 'root' //Singleton
    }),
    __metadata("design:paramtypes", [Router])
], NavigationService);
export { NavigationService };
//# sourceMappingURL=navigation.service.js.map