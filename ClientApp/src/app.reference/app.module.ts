import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';
import { AccountModule } from './account/account.module';
import { TokenInterceptor } from './shared/security/_interceptor';
import { DashboardModule } from './dashboard/dashboard.module';

@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		BrowserModule,
		HttpClientModule,
		SharedModule,
		AccountModule,
		DashboardModule,
		AppRoutingModule, //Contains '**' path, must come last; import order matters
	],
	entryComponents: [],
	providers: [
		{
			provide: HTTP_INTERCEPTORS,
			useClass: TokenInterceptor,
			multi: true
		}
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
