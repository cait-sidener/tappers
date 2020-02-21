import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { AuthCanActivateGuard } from '../shared/security/_guards';

const routes: Routes = [
	{ path: 'dashboard', component: DashboardComponent, canActivate: [AuthCanActivateGuard] }
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class DashboardRoutingModule { }
