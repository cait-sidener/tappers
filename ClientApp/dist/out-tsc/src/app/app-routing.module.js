import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CalendarFormComponent } from './calendar/calendar-form/calendar-form.component';
const routes = [
    { path: '', component: CalendarFormComponent, pathMatch: 'full' },
    { path: '**', redirectTo: '', pathMatch: 'full' } //Custom 404 page here.
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