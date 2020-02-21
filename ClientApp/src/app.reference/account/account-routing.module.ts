import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthCanActivateGuard } from '../shared/security/_guards';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { UserListComponent } from './user/user-list/user-list.component';

const routes: Routes = [
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

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class AccountRoutingModule { }
