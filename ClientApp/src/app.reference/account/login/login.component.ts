import { Component, ChangeDetectorRef, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { AuthService } from '../../shared/security/_services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UrlUtility } from '../../shared/_utilities';
import { NavigationService } from '../../shared/navigation/_services';
import { Subscription } from 'rxjs';

@Component({
	//selector: 'app-login', //Used in routing; doesn't need a tag selector.
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnDestroy {
	email: string = '';
	password: string = '';
	password_verify: string = '';
	code: string = '';

	isStandardLogin: boolean = false;
	isForgotten: boolean = false;
	isForgotten_Stage: number = 0;

	private subscription: Subscription = new Subscription(); //Acts as a container for multiple subscriptions by using the Add function.

	constructor(private cdr: ChangeDetectorRef, private route: ActivatedRoute, private router: Router, private authService: AuthService, private navService: NavigationService) {
		this.navService.visible = false;
		if (this.authService.isAuthenticated()) this.returnToUrl(); //User is already logged in.
	}

	check(): void { //Always run check if changes in component need to be reflected on view.
		this.cdr.markForCheck();
	}

	ngOnDestroy(): void {
		if (!this.subscription.closed) //CYA; Always unsubscribe on destroy event to prevent memory leaks.
			this.subscription.unsubscribe();
		this.navService.visible = true;
	}

	onSubmit_Login(): void {
		this.subscription.add(this.authService.login({ email: this.email, password: this.password }).subscribe(
			() => {
				this.returnToUrl();
			}, (error: any) => console.log(error)));
	}

	onSubmit_Forgotten_Email(): void {
		this.subscription.add(this.authService.sendVerificationEmail(this.email).subscribe(
			() => {
				this.isForgotten_Stage = 1
				this.check();
			}
		));
	}

	onSubmit_Forgotten_Code(): void {
		this.subscription.add(this.authService.login({ otp: this.code.trim() }).subscribe(
			() => {
				this.router.navigate(['/']);
			}, (error: any) => console.log(error)));
	}

	loginWithAD(): void {
		this.subscription.add(this.authService.loginAD().subscribe(
			() => {
				this.returnToUrl();
			}, error => console.log(error)));
	}

	goBack(): void {
		if (this.isForgotten) {
			this.isForgotten = false;
			this.isForgotten_Stage = 0;
		}
		else this.isStandardLogin = false;
	}

	private returnToUrl(): void {
		let returnURL = this.route.snapshot.queryParams['returnUrl'] || this.navService.previousURL;
		if (UrlUtility.isExternalUrl(returnURL)) {
			this.subscription.add(this.authService.getOTP().subscribe(
				otp => {
					if (returnURL.indexOf("?") === -1)
						window.location.href = `${returnURL}?sso_otp=${otp}`;
					else window.location.href = `${returnURL}&sso_otp=${otp}`;
				}, error => console.log(error)));
		} else this.router.navigateByUrl(returnURL || '/account');
	}
}
