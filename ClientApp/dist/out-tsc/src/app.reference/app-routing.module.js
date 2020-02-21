import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NotFoundComponent } from './shared/navigation/not-found/not-found.component';
import { UnauthorizedComponent } from './shared/security/unauthorized/unauthorized.component';
import { AuthCanActivateGuard } from './shared/security/_guards';
const routes = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'unauthorized', component: UnauthorizedComponent, canActivate: [AuthCanActivateGuard], pathMatch: 'full' },
    { path: '**', component: NotFoundComponent, canActivate: [AuthCanActivateGuard], pathMatch: 'full' } //Custom 404 page here.
];
let AppRoutingModule = class AppRoutingModule {
};
AppRoutingModule = __decorate([
    NgModule({
        imports: [RouterModule.forRoot(routes)],
        exports: [RouterModule]
    })
], AppRoutingModule);
export { AppRoutingModule };
//# sourceMappingURL=app-routing.module.js.map