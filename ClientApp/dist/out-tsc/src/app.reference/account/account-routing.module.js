import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthCanActivateGuard } from '../shared/security/_guards';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { UserListComponent } from './user/user-list/user-list.component';
const routes = [
    {
        path: 'account', children: [
            { path: '', component: ProfileComponent, canActivate: [AuthCanActivateGuard] },
            { path: 'login', component: LoginComponent },
            {
                path: 'user', canActivate: [AuthCanActivateGuard], data: { roles: ['Admin'] }, children: [
                    { path: '', component: UserListComponent }
                ]
            }
        ]
    }
];
let AccountRoutingModule = class AccountRoutingModule {
};
AccountRoutingModule = __decorate([
    NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule]
    })
], AccountRoutingModule);
export { AccountRoutingModule };
//# sourceMappingURL=account-routing.module.js.map