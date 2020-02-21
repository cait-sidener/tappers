import { __decorate, __metadata } from "tslib";
import { Component, Input, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { AuthService } from '../../shared/security/_services/auth.service';
let WelcomeComponent = class WelcomeComponent {
    constructor(cdr, authService) {
        this.cdr = cdr;
        this.authService = authService;
        this.displayName = '';
        this.cdr.detach();
    }
    check() {
        this.cdr.detectChanges();
    }
    ngOnInit() {
        let updated = false, storageItem = this.authService.getStorageItem();
        if (this.id)
            updated = true;
        if (storageItem) {
            this.displayName = storageItem['displayName'];
            updated = true;
        }
        if (updated)
            this.check(); //Changes were made and need to be rendered.
    }
};
__decorate([
    Input(),
    __metadata("design:type", Number)
], WelcomeComponent.prototype, "id", void 0);
WelcomeComponent = __decorate([
    Component({
        //selector: 'app-welcome', //Used in routing; doesn't need a tag selector.
        templateUrl: './welcome.component.html',
        styleUrls: ['./welcome.component.scss'],
        changeDetection: ChangeDetectionStrategy.OnPush
    }),
    __metadata("design:paramtypes", [ChangeDetectorRef, AuthService])
], WelcomeComponent);
export { WelcomeComponent };
//# sourceMappingURL=welcome.component.js.map