import { __decorate } from "tslib";
import { RouterModule } from "@angular/router";
import { CalendarFormComponent } from './calendar-form/calendar-form.component';
import { NgModule } from '@angular/core';
const routes = [
    { path: 'calendar', component: CalendarFormComponent }
];
let CalendarRoutingModule = class CalendarRoutingModule {
};
CalendarRoutingModule = __decorate([
    NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule]
    })
], CalendarRoutingModule);
export { CalendarRoutingModule };
//# sourceMappingURL=calendar-routing.module.js.map