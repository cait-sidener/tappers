import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalComponent } from './modal/modal.component';
import { PaginationComponent } from './pagination/pagination.component';
import { HttpClientModule } from '@angular/common/http';
import { PaginatorService } from './pagination/_services';
import { UrlUtility } from './_utilities';
import { NavigationComponent } from './navigation/navigation.component';
import { RouterModule } from '@angular/router';
import { NotFoundComponent } from './navigation/not-found/not-found.component';
import { UnauthorizedComponent } from './security/unauthorized/unauthorized.component';
import { LoaderComponent } from './indicator/loader/loader.component';
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
], SharedModule);
export { SharedModule };
//# sourceMappingURL=shared.module.js.map