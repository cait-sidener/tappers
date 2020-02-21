import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';
import { CalendarModule } from './calendar/calendar.module';
import { AccordionModule } from 'ngx-bootstrap';

@NgModule({
	declarations: [
		AppComponent,
		
	],
	imports: [
		AccordionModule,
		BrowserAnimationsModule,
		BrowserModule,
		CalendarModule,
		HttpClientModule,
		SharedModule,
		AppRoutingModule, //Contains '**' path, must come last; import order matters
	],
	entryComponents: [],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
