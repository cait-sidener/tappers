import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { AccountRoutingModule } from './account-routing.module';
import { UserListComponent } from './user/user-list/user-list.component';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './login/login.component';
import { UserDetailComponent } from './user/user-detail/user-detail.component';
let AccountModule = class AccountModule {
};
AccountModule = __decorate([
    NgModule({
        declarations: [
            LoginComponent,
            ProfileComponent,
            UserListComponent,
            UserDetailComponent
        ],
        imports: [
            CommonModule,
            FormsModule,
            SharedModule,
            AccountRoutingModule
        ],
        entryComponents: [
            UserDetailComponent
        ]
    })
], AccountModule);
export { AccountModule };
//# sourceMappingURL=account.module.js.map