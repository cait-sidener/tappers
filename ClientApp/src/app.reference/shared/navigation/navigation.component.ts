import { Component, ChangeDetectionStrategy, ChangeDetectorRef, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../security/_services';
import { Subscription } from 'rxjs';
import { NavigationService } from './_services';
import { Router } from '@angular/router';

@Component({
	selector: 'app-navigation',
	templateUrl: './navigation.component.html',
	styleUrls: ['./navigation.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavigationComponent implements OnInit, OnDestroy {
	displayName: string = '';
	showSidebar: boolean = false;
	showExpanded: boolean = false;

	private _isLoggedIn: boolean = false;
	get isLoggedIn(): boolean {
		return this._isLoggedIn
	}

	private subscription: Subscription = new Subscription();

	constructor(private cdr: ChangeDetectorRef, private router: Router, private authService: AuthService, public navService: NavigationService) { }

	check(): void { //Always run check if changes in component need to be reflected on view.
		this.cdr.markForCheck();
	}

	ngOnInit(): void {
		this._isLoggedIn = this.authService.isAuthenticated(false); //Ignore expiration. Could have started session after access token expired (Will be renewed if possible).
		this.setAuthValues();
		this.subscription.add(this.authService.auth_changed.subscribe((isLoggedIn: boolean) => {
			this._isLoggedIn = isLoggedIn;
			if (!isLoggedIn) this.router.navigate(['account/login']);
			this.setAuthValues();
		}));
		this.subscription.add(this.authService.password_expired.subscribe(() => {
			console.log("Password Expired");
		}));
		this.subscription.add(this.navService.visiblity_changed.subscribe(() => this.check()));
	}

	ngOnDestroy(): void {
		if (!this.subscription.closed)
			this.subscription.unsubscribe();
	}

	isAuthorized(allowedRoles: string[]): boolean {
		return this.authService.isAuthorized(allowedRoles);
	}

	logout(): void {
		this.authService.logout();
	}

	toggleExpanded(state?: boolean): void {
		if (state) this.showExpanded = state;
		this.showExpanded = !this.showExpanded;
	}

	toggleSidebar(state?: boolean): void {
		if (state) this.showSidebar = state;
		this.showSidebar = !this.showSidebar;
		if (!this.showSidebar) this.showExpanded = false;
	}

	private setAuthValues(): void {
		if (this.isLoggedIn) this.displayName = this.authService.getTokenValue('unique_name');
		else this.displayName = "SSO User";
		this.check();
	}
}
