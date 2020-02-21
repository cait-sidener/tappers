import { __decorate, __metadata } from "tslib";
import { Component, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { Subscription, Subject } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';
import { AccountUserService } from '../_services';
import { ModalService } from '../../../shared/modal/_services';
import { UserDetailComponent } from '../user-detail/user-detail.component';
let UserListComponent = class UserListComponent {
    constructor(cdr, modalService, userService) {
        this.cdr = cdr;
        this.modalService = modalService;
        this.userService = userService;
        this.users = [];
        this.filteredUsers = [];
        this.pagedUsers = [];
        this.isLoading = false;
        this._listFilter = '';
        this.subscription = new Subscription(); //Acts as a container for multiple subscriptions by using the Add function.
        this.refreshData = new Subject(); //Acts as an observable that can be manually triggered.
    }
    get listFilter() {
        return this._listFilter; //Avoid manipulating the data in the getter, formatting/etc. should be done with pipes.
    }
    set listFilter(value) {
        this._listFilter = value;
        this.filteredUsers = this._listFilter ? this.performFilter(this.listFilter) : this.users;
        this.check();
    }
    check() {
        this.cdr.detectChanges();
    }
    ngOnInit() {
        this.cdr.detach(); //Detach from main CDR Tree.
        this.filteredUsers = this.users = this.userService.userList_Saved; //Temporary until replaced by the initial call to API.
        this.subscription.add(this.refreshData.pipe(//Refresh triggered by the Subject observable.
        startWith(0), //Get data initially
        switchMap((id) => {
            if (id) //If a specific user ID is given replace only that ID.
                return this.userService.getUser(id);
            return this.userService.getUsers();
        })).subscribe((rawUserData) => {
            this.isLoading = false;
            if (Array.isArray(rawUserData)) //Array of Users
                this.filteredUsers = this.users = rawUserData; //Shuffle data to show that the data is fresh.
            else { //Specific User
                let userData = rawUserData;
                let userIndex = this.users.findIndex(user => user.userID == userData.userID);
                this.users.splice(userIndex, 1, userData); //Replace with fresh data.
            }
            this.check();
        }, error => console.log(error)));
        this.subscription.add(this.userService.data_changed.subscribe((id) => this.refreshUser(id)));
        this.check();
    }
    ngOnDestroy() {
        this.userService.userList_Saved = this.users;
        if (this.modalService.isVisible) //CYA; Prevents modal sticking around on redirects.
            this.modalService.hide();
        if (!this.subscription.closed) //CYA; Always unsubscribe on destroy event to prevent memory leaks.
            this.subscription.unsubscribe();
    }
    onChangePage(pageItems) {
        this.pagedUsers = pageItems;
        this.check();
    }
    openDetails(id) {
        this.modalService.show(UserDetailComponent, { title: "User Details" }, { id: id });
    }
    trackById(index, user) {
        return user.userID;
    }
    performFilter(filterBy) {
        filterBy = filterBy.toLocaleLowerCase();
        return this.users.filter((user) => user.firstName.toLocaleLowerCase().indexOf(filterBy) !== -1);
    }
    refreshUsers() {
        this.isLoading = true;
        this.refreshData.next(); //Trigger observable.
        this.check();
    }
    refreshUser(id) {
        this.isLoading = true;
        this.refreshData.next(id); //Trigger observable.
        this.check();
    }
};
UserListComponent = __decorate([
    Component({
        //selector: 'app-user-list', //Used in routing; doesn't need a tag selector.
        templateUrl: './user-list.component.html',
        styleUrls: ['./user-list.component.scss'],
        changeDetection: ChangeDetectionStrategy.OnPush
    }),
    __metadata("design:paramtypes", [ChangeDetectorRef, ModalService, AccountUserService])
], UserListComponent);
export { UserListComponent };
//# sourceMappingURL=user-list.component.js.map