import { __decorate, __metadata } from "tslib";
import { Component, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { AuthService } from '../../shared/security/_services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UrlUtility } from '../../shared/_utilities';
import { NavigationService } from '../../shared/navigation/_services';
import { Subscription } from 'rxjs';
let LoginComponent = class LoginComponent {
    constructor(cdr, route, router, authService, navService) {
        this.cdr = cdr;
        this.route = route;
        this.router = router;
        this.authService = authService;
        this.navService = navService;
        this.email = '';
        this.password = '';
        this.password_verify = '';
        this.code = '';
        this.isStandardLogin = false;
        this.isForgotten = false;
        this.isForgotten_Stage = 0;
        this.subscription = new Subscription(); //Acts as a container for multiple subscriptions by using the Add function.
        this.navService.visible = false;
        if (this.authService.isAuthenticated())
            this.returnToUrl(); //User is already logged in.
    }
    check() {
        this.cdr.markForCheck();
    }
    ngOnDestroy() {
        if (!this.subscription.closed) //CYA; Always unsubscribe on destroy event to prevent memory leaks.
            this.subscription.unsubscribe();
        this.navService.visible = true;
    }
    onSubmit_Login() {
        this.subscription.add(this.authService.login({ email: this.email, password: this.password }).subscribe(() => {
            this.returnToUrl();
        }, (error) => console.log(error)));
    }
    onSubmit_Forgotten_Email() {
        this.subscription.add(this.authService.sendVerificationEmail(this.email).subscribe(() => {
            this.isForgotten_Stage = 1;
            this.check();
        }));
    }
    onSubmit_Forgotten_Code() {
        this.subscription.add(this.authService.login({ otp: this.code.trim() }).subscribe(() => {
            this.router.navigate(['/']);
        }, (error) => console.log(error)));
    }
    loginWithAD() {
        this.subscription.add(this.authService.loginAD().subscribe(() => {
            this.returnToUrl();
        }, error => console.log(error)));
    }
    goBack() {
        if (this.isForgotten) {
            this.isForgotten = false;
            this.isForgotten_Stage = 0;
        }
        else
            this.isStandardLogin = false;
    }
    returnToUrl() {
        let returnURL = this.route.snapshot.queryParams['returnUrl'] || this.navService.previousURL;
        if (UrlUtility.isExternalUrl(returnURL)) {
            this.subscription.add(this.authService.getOTP().subscribe(otp => {
                if (returnURL.indexOf("?") === -1)
                    window.location.href = `${returnURL}?sso_otp=${otp}`;
                else
                    window.location.href = `${returnURL}&sso_otp=${otp}`;
            }, error => console.log(error)));
        }
        else
            this.router.navigateByUrl(returnURL || '/account');
    }
};
LoginComponent = __decorate([
    Component({
        //selector: 'app-login', //Used in routing; doesn't need a tag selector.
        templateUrl: './login.component.html',
        styleUrls: ['./login.component.scss'],
        changeDetection: ChangeDetectionStrategy.OnPush
    }),
    __metadata("design:paramtypes", [ChangeDetectorRef, ActivatedRoute, Router, AuthService, NavigationService])
], LoginComponent);
export { LoginComponent };
//# sourceMappingURL=login.component.js.map