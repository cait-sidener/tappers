import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';
import { CalendarModule } from './calendar/calendar.module';
import { AccountModule } from './account/account.module';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { ArchivesModule } from './archives/archives.module';

@NgModule({
	declarations: [
		AppComponent,
		
	],
	imports: [
		AngularFireModule.initializeApp(environment.firebaseConfig),
		AngularFirestoreModule,
		AngularFireAuthModule,
		ArchivesModule,
		AccountModule,
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
