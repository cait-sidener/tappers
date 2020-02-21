import { __decorate, __metadata } from "tslib";
import { Component, ChangeDetectorRef, ChangeDetectionStrategy, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { AccountUserService } from '../_services';
import { AuthService } from '../../../shared/security/_services';
let UserDetailComponent = class UserDetailComponent {
    constructor(cdr, authService, userService) {
        this.cdr = cdr;
        this.authService = authService;
        this.userService = userService;
        this.editMode = false;
        this.isLoading = false;
        this.loadingText = '';
        this.subscription = new Subscription(); //Acts as a container for multiple subscriptions by using the Add function.
        this.currentUserID = +this.authService.getTokenValue('primarysid');
    }
    check() {
        this.cdr.markForCheck();
    }
    ngOnInit() {
        this.loadingText = "Retreiving user's data.";
        this.isLoading = true;
        this.subscription.add(this.userService.getUser(this.id).subscribe((user) => {
            this.isLoading = false;
            this.userData = user;
            this.userData_Store = JSON.parse(JSON.stringify(user)); //Deep Copy original values.
            this.check();
        }));
    }
    ngOnDestroy() {
        if (!this.subscription.closed) //CYA; Always unsubscribe on destroy event to prevent memory leaks.
            this.subscription.unsubscribe();
    }
    onSubmit() {
        this.loadingText = "Saving user's data.";
        this.isLoading = true;
        this.subscription.add(this.userService.updateUser(this.userData).subscribe((isUpdated) => {
            this.isLoading = false;
            if (isUpdated) {
                this.editMode = false;
            }
            this.check();
        }));
        this.check();
    }
    toggleEditMode() {
        if (this.editMode)
            this.userData = JSON.parse(JSON.stringify(this.userData_Store)); //Deep Copy original values.
        this.editMode = !this.editMode;
        this.check();
    }
};
__decorate([
    Input(),
    __metadata("design:type", Number)
], UserDetailComponent.prototype, "id", void 0);
UserDetailComponent = __decorate([
    Component({
        //selector: 'app-user-detail', //Used in routing; doesn't need a tag selector.
        templateUrl: './user-detail.component.html',
        styleUrls: ['./user-detail.component.scss'],
        changeDetection: ChangeDetectionStrategy.OnPush
    }),
    __metadata("design:paramtypes", [ChangeDetectorRef, AuthService, AccountUserService])
], UserDetailComponent);
export { UserDetailComponent };
//# sourceMappingURL=user-detail.component.js.map