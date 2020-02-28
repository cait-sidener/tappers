import { Component, ChangeDetectionStrategy, ChangeDetectorRef, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { NavigationService } from './_services';
import { Router } from '@angular/router';
import { UserService } from '../../account/user.service';

@Component({
	selector: 'app-navigation',
	templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.scss'],
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

	constructor(private cdr: ChangeDetectorRef, private router: Router, public navService: NavigationService, public auth: UserService) { }
	data() {
		return {
			isOpen: false,
		}
	}


	check(): void { //Always run check if changes in component need to be reflected on view.
		this.cdr.markForCheck();
	}

	ngOnInit(): void {
		this.subscription.add(this.navService.visiblity_changed.subscribe(() => this.check()));
	}

	ngOnDestroy(): void {
		if (!this.subscription.closed)
			this.subscription.unsubscribe();
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

	logout() {
		this.auth.signOut();
    }

}

