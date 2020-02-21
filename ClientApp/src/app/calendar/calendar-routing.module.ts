import { Routes, RouterModule } from "@angular/router";
import { CalendarFormComponent } from './calendar-form/calendar-form.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
    { path: 'calendar', component: CalendarFormComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CalendarRoutingModule { }
