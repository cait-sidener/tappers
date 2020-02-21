import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CalendarRoutingModule } from './calendar-routing.module';
import { CalendarFormComponent } from './calendar-form/calendar-form.component';
import { AddEventComponent } from './add-event/add-event.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarService } from './_services';
import { FullCalendarModule } from '@fullcalendar/angular';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/database';

@NgModule({
	declarations: [
		CalendarFormComponent,
		AddEventComponent
	],
	imports: [
		AngularFireModule.initializeApp(environment.firebaseConfig),
		AngularFirestoreModule,
		AngularFireDatabaseModule,
		BrowserAnimationsModule,
		CalendarRoutingModule,
		CommonModule,
		FormsModule,
		FullCalendarModule,
	],
	providers: [
		CalendarService
	]
})
export class CalendarModule { }
