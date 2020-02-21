import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalComponent } from './modal/modal.component';
import { PaginationComponent } from './pagination/pagination.component';
import { HttpClientModule } from '@angular/common/http';
import { DOMService, StorageService } from './_services';
import { ModalService } from './modal/_services';
import { PaginatorService } from './pagination/_services';
import { AuthService } from './security/_services/auth.service';
import { AuthCanActivateGuard } from './security/_guards';
import { UrlUtility } from './_utilities';
import { TokenInterceptor } from './security/_interceptor';
import { NavigationComponent } from './navigation/navigation.component';
import { RouterModule } from '@angular/router';
import { NavigationService } from './navigation/_services';
import { NotFoundComponent } from './navigation/not-found/not-found.component';
import { UnauthorizedComponent } from './security/unauthorized/unauthorized.component';
import { LoaderComponent } from './indicator/loader/loader.component';

@NgModule({
	declarations: [
		ModalComponent,
		PaginationComponent,
		NavigationComponent,
		LoaderComponent,
		NotFoundComponent, //404 Page
		UnauthorizedComponent
	],
	providers: [
		//DOMService, //Singleton
		//StorageService, //Singleton
		//ModalService, //Singleton
		PaginatorService,
		//AuthService, //Singleton
		//NavigationService, //Singleton
		//AuthCanActivateGuard, //Singleton
		//TokenInterceptor, //Singleton
		UrlUtility
	],
	imports: [
		CommonModule,
		FormsModule,
		HttpClientModule,
		RouterModule
	],
	exports: [
		ModalComponent,
		PaginationComponent,
		NavigationComponent,
		LoaderComponent
	]
})
export class SharedModule { }
