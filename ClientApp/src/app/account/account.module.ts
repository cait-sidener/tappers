import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { AccountRoutingModule } from './account-routing.module';
import { LoginComponent } from './login/login.component';
import { UserService } from './user.service';

@NgModule({
	declarations: [
		LoginComponent,
	],
	imports: [
		CommonModule,
		FormsModule,
		SharedModule,
		AccountRoutingModule
	],
	entryComponents: [
	],
	providers: [

		UserService
	]
})
export class AccountModule { }
