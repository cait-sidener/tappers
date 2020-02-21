import { Component, OnInit, OnDestroy, ChangeDetectorRef, ChangeDetectionStrategy, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { AccountUserService } from '../_services';
import { IUser } from '../user';
import { AuthService } from '../../../shared/security/_services';

@Component({
	//selector: 'app-user-detail', //Used in routing; doesn't need a tag selector.
	templateUrl: './user-detail.component.html',
	styleUrls: ['./user-detail.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserDetailComponent implements OnInit, OnDestroy {
	@Input() id!: number; //Value isn't set on creation but is available on init.

	currentUserID: number; //Some data shouldn't be editable if editing self.

	userData_Store?: IUser;
	userData?: IUser;
	editMode: boolean = false;

	isLoading: boolean = false;
	loadingText: string = '';

	private subscription: Subscription = new Subscription(); //Acts as a container for multiple subscriptions by using the Add function.

	constructor(private cdr: ChangeDetectorRef, private authService: AuthService, private userService: AccountUserService) {
		this.currentUserID = +this.authService.getTokenValue('primarysid');
	}

	check(): void { //Always run check if changes in component need to be reflected on view.
		this.cdr.markForCheck();
	}

	ngOnInit(): void {
		this.loadingText = "Retreiving user's data.";
		this.isLoading = true;
		this.subscription.add(this.userService.getUser(this.id).subscribe(
			(user: IUser) => {
				this.isLoading = false;
				this.userData = user;
				this.userData_Store = JSON.parse(JSON.stringify(user)); //Deep Copy original values.
				this.check();
			}
		))
	}

	ngOnDestroy(): void {
		if (!this.subscription.closed) //CYA; Always unsubscribe on destroy event to prevent memory leaks.
			this.subscription.unsubscribe();
	}

	onSubmit(): void {
		this.loadingText = "Saving user's data.";
		this.isLoading = true;
		this.subscription.add(this.userService.updateUser(this.userData as IUser).subscribe(
			(isUpdated: boolean) => {
				this.isLoading = false;
				if (isUpdated) {
					this.editMode = false;
				}
				this.check();
			}
		));
		this.check();
	}

	toggleEditMode(): void {
		if (this.editMode) this.userData = JSON.parse(JSON.stringify(this.userData_Store)); //Deep Copy original values.
		this.editMode = !this.editMode;
		this.check();
	}
}
