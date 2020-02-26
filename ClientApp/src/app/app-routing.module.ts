import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './shared/navigation/not-found/not-found.component';
import { CalendarFormComponent } from './calendar/calendar-form/calendar-form.component';


const routes: Routes = [
	{ path: '', component: CalendarFormComponent, pathMatch: 'full' }, //Homepage
	{ path: '**', component: NotFoundComponent, pathMatch: 'full' } //Custom 404 page here.
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
