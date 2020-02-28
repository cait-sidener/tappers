import { Routes, RouterModule } from "@angular/router";
import { CalendarFormComponent } from './calendar-form/calendar-form.component';
import { NgModule } from '@angular/core';
import { AddEventComponent } from './add-event/add-event.component';
import { AuthGuard } from '../account/auth.guard';

const routes: Routes = [
    { path: 'calendar', component: CalendarFormComponent },
    { path: 'add-event', component: AddEventComponent, canActivate: [AuthGuard] }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CalendarRoutingModule { }
