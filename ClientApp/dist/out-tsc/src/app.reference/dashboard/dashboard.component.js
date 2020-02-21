import { __decorate, __metadata } from "tslib";
import { Component, Input, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { AuthService } from '../shared/security/_services';
let DashboardComponent = class DashboardComponent {
    constructor(cdr, authService) {
        this.cdr = cdr;
        this.authService = authService;
        this.displayName = '';
    }
    check() {
        this.cdr.detectChanges();
    }
    ngOnInit() {
        this.cdr.detach();
        let updated = false;
        if (this.id)
            updated = true;
        if (this.authService.isAuthenticated()) {
            this.displayName = this.authService.getTokenValue('unique_name');
            updated = true;
        }
        if (updated)
            this.check(); //Changes were made and need to be rendered.
    }
};
__decorate([
    Input(),
    __metadata("design:type", Number)
], DashboardComponent.prototype, "id", void 0);
DashboardComponent = __decorate([
    Component({
        //selector: 'app-dashboard', //Used in routing; doesn't need a tag selector.
        templateUrl: './dashboard.component.html',
        styleUrls: ['./dashboard.component.scss'],
        changeDetection: ChangeDetectionStrategy.OnPush
    }),
    __metadata("design:paramtypes", [ChangeDetectorRef, AuthService])
], DashboardComponent);
export { DashboardComponent };
//# sourceMappingURL=dashboard.component.js.map