import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalComponent } from './modal/modal.component';
import { PaginationComponent } from './pagination/pagination.component';
import { HttpClientModule } from '@angular/common/http';
import { ModalService } from './modal/_services';
import { PaginatorService } from './pagination/_services';
import { UrlUtility } from './_utilities';
import { NavigationComponent } from './navigation/navigation.component';
import { RouterModule } from '@angular/router';
import { NavigationService } from './navigation/_services';
import { NotFoundComponent } from './navigation/not-found/not-found.component';
import { LoaderComponent } from './indicator/loader/loader.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
let SharedModule = class SharedModule {
};
SharedModule = __decorate([
    NgModule({
        declarations: [
            ModalComponent,
            PaginationComponent,
            NavigationComponent,
            LoaderComponent,
            NotFoundComponent,
        ],
        providers: [
            //DOMService, //Singleton
            //StorageService, //Singleton
            ModalService,
            PaginatorService,
            //AuthService, //Singleton
            NavigationService,
            //AuthCanActivateGuard, //Singleton
            //TokenInterceptor, //Singleton
            UrlUtility
        ],
        imports: [
            BrowserAnimationsModule,
            BsDatepickerModule,
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
], SharedModule);
export { SharedModule };
//# sourceMappingURL=shared.module.js.map