import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
let DashboardModule = class DashboardModule {
};
DashboardModule = __decorate([
    NgModule({
        declarations: [
            DashboardComponent
        ],
        imports: [
            CommonModule,
            DashboardRoutingModule
        ]
    })
], DashboardModule);
export { DashboardModule };
//# sourceMappingURL=dashboard.module.js.map