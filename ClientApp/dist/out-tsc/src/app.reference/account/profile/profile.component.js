import { __decorate, __metadata } from "tslib";
import { Component, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProfileService } from './_services/profile.service';
import { AuthService } from '../../shared/security/_services';
let ProfileComponent = class ProfileComponent {
    constructor(cdr, authService, profileService) {
        this.cdr = cdr;
        this.authService = authService;
        this.profileService = profileService;
        this.protectedData = '';
        this.code = '';
        this.currentPassword = '';
        this.newPassword = '';
        this.verifyPassword = '';
        this.subscription = new Subscription(); //Acts as a container for multiple subscriptions by using the Add function.
    }
    check() {
        this.cdr.markForCheck();
    }
    ngOnInit() {
        this.subscription.add(this.profileService.getData().subscribe(data => {
            this.protectedData = data;
            this.check();
        }, error => console.log(error)));
    }
    ngOnDestroy() {
        if (!this.subscription.closed) //CYA; Always unsubscribe on destroy event to prevent memory leaks.
            this.subscription.unsubscribe();
    }
    onSubmit_ChangePassword() {
        if (this.currentPassword && this.newPassword && (this.newPassword === this.verifyPassword)) {
            this.subscription.add(this.authService.changePassword(this.newPassword, this.currentPassword).subscribe(code => {
                this.code = `Code: ${code}`;
                this.check();
            }, error => console.log(error)));
        }
    }
};
ProfileComponent = __decorate([
    Component({
        //selector: 'app-profile', //Used in routing; doesn't need a tag selector.
        templateUrl: './profile.component.html',
        styleUrls: ['./profile.component.scss'],
        changeDetection: ChangeDetectionStrategy.OnPush
    }),
    __metadata("design:paramtypes", [ChangeDetectorRef, AuthService, ProfileService])
], ProfileComponent);
export { ProfileComponent };
//# sourceMappingURL=profile.component.js.map