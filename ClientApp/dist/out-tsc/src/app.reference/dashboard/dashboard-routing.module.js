import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { AuthCanActivateGuard } from '../shared/security/_guards';
const routes = [
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthCanActivateGuard] }
];
let DashboardRoutingModule = class DashboardRoutingModule {
};
DashboardRoutingModule = __decorate([
    NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule]
    })
], DashboardRoutingModule);
export { DashboardRoutingModule };
//# sourceMappingURL=dashboard-routing.module.js.map