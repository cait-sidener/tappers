import { Component, ChangeDetectorRef, ChangeDetectionStrategy, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProfileService } from './_services/profile.service';
import { AuthService } from '../../shared/security/_services';

@Component({
	//selector: 'app-profile', //Used in routing; doesn't need a tag selector.
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileComponent implements OnInit, OnDestroy {
	protectedData: string = '';

	code: string = '';
	currentPassword: string = '';
	newPassword: string = '';
	verifyPassword: string = '';

	private subscription: Subscription = new Subscription(); //Acts as a container for multiple subscriptions by using the Add function.

	constructor(private cdr: ChangeDetectorRef, private authService: AuthService, private profileService: ProfileService) { }

	check(): void { //Always run check if changes in component need to be reflected on view.
		this.cdr.markForCheck();
	}

	ngOnInit(): void {
		this.subscription.add(this.profileService.getData().subscribe(
			data => {
				this.protectedData = data;
				this.check();
			}, error => console.log(error)
		));
	}

	ngOnDestroy(): void {
		if (!this.subscription.closed) //CYA; Always unsubscribe on destroy event to prevent memory leaks.
			this.subscription.unsubscribe();
	}

	onSubmit_ChangePassword(): void {
		if (this.currentPassword && this.newPassword && (this.newPassword === this.verifyPassword)) {
			this.subscription.add(this.authService.changePassword(this.newPassword, this.currentPassword).subscribe(
				code => {
					this.code = `Code: ${code}`;
					this.check();
				}, error => console.log(error)
			));
		}
	}
}
