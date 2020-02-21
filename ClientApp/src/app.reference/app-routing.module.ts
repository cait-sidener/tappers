import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './shared/navigation/not-found/not-found.component';
import { UnauthorizedComponent } from './shared/security/unauthorized/unauthorized.component';
import { AuthCanActivateGuard } from './shared/security/_guards';

const routes: Routes = [
	{ path: '', redirectTo: 'dashboard', pathMatch: 'full' }, //Homepage
	{ path: 'unauthorized', component: UnauthorizedComponent, canActivate: [AuthCanActivateGuard], pathMatch: 'full' },
	{ path: '**', component: NotFoundComponent, canActivate: [AuthCanActivateGuard], pathMatch: 'full' } //Custom 404 page here.
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
