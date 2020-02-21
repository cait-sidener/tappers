import { Component, OnInit, OnDestroy, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { Subscription, Subject } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';
import { IUser } from '../user';
import { AccountUserService } from '../_services';
import { ModalService } from '../../../shared/modal/_services';
import { UserDetailComponent } from '../user-detail/user-detail.component';

@Component({
	//selector: 'app-user-list', //Used in routing; doesn't need a tag selector.
	templateUrl: './user-list.component.html',
	styleUrls: ['./user-list.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserListComponent implements OnInit, OnDestroy {
	users: IUser[] = [];
	filteredUsers: IUser[] = [];
	pagedUsers: IUser[] = [];

	isLoading: boolean = false;

	private _listFilter: string = '';
	get listFilter(): string {
		return this._listFilter; //Avoid manipulating the data in the getter, formatting/etc. should be done with pipes.
	}
	set listFilter(value: string) {
		this._listFilter = value;
		this.filteredUsers = this._listFilter ? this.performFilter(this.listFilter) : this.users;
		this.check();
	}

	private subscription: Subscription = new Subscription(); //Acts as a container for multiple subscriptions by using the Add function.
	private refreshData: Subject<number> = new Subject<number>(); //Acts as an observable that can be manually triggered.

	constructor(private cdr: ChangeDetectorRef, private modalService: ModalService, private userService: AccountUserService) {}

	check(): void { //Always run check if changes in component need to be reflected on view.
		this.cdr.detectChanges();
	}

	ngOnInit(): void {
		this.cdr.detach(); //Detach from main CDR Tree.
		this.filteredUsers = this.users = this.userService.userList_Saved; //Temporary until replaced by the initial call to API.
		this.subscription.add(this.refreshData.pipe( //Refresh triggered by the Subject observable.
			startWith(0), //Get data initially
			switchMap(
				(id: number) => {
					if (id) //If a specific user ID is given replace only that ID.
						return this.userService.getUser(id);
					return this.userService.getUsers();
				}
			)).subscribe(
				(rawUserData: IUser | IUser[]) => {
					this.isLoading = false;
					if (Array.isArray(rawUserData)) //Array of Users
						this.filteredUsers = this.users = rawUserData as IUser[]; //Shuffle data to show that the data is fresh.
					else { //Specific User
						let userData = rawUserData as IUser;
						let userIndex = this.users.findIndex(user => user.userID == userData.userID);
						this.users.splice(userIndex, 1, userData); //Replace with fresh data.
					}
					this.check();
				}, error => console.log(error)
			));
		this.subscription.add(this.userService.data_changed.subscribe((id: number) => this.refreshUser(id)));
		this.check();
	}

	ngOnDestroy(): void {
		this.userService.userList_Saved = this.users;
		if (this.modalService.isVisible) //CYA; Prevents modal sticking around on redirects.
			this.modalService.hide();
		if (!this.subscription.closed) //CYA; Always unsubscribe on destroy event to prevent memory leaks.
			this.subscription.unsubscribe();
	}

	onChangePage(pageItems: IUser[]) {
		this.pagedUsers = pageItems;
		this.check();
	}

	openDetails(id: number) {
		this.modalService.show(UserDetailComponent, { title: "User Details" }, { id: id });
	}

	trackById(index: number, user: IUser): number { //Greatly improves the performance of *ngFor when updating the data.
		return user.userID;
	}

	performFilter(filterBy: string): IUser[] {
		filterBy = filterBy.toLocaleLowerCase();
		return this.users.filter((user: IUser) => user.firstName.toLocaleLowerCase().indexOf(filterBy) !== -1);
	}

	refreshUsers(): void {
		this.isLoading = true;
		this.refreshData.next(); //Trigger observable.
		this.check();
	}

	refreshUser(id: number) {
		this.isLoading = true;
		this.refreshData.next(id); //Trigger observable.
		this.check();
	}
}
