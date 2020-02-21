import { __decorate } from "tslib";
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';
import { AccountModule } from './account/account.module';
import { TokenInterceptor } from './shared/security/_interceptor';
import { DashboardModule } from './dashboard/dashboard.module';
let AppModule = class AppModule {
};
AppModule = __decorate([
    NgModule({
        declarations: [
            AppComponent
        ],
        imports: [
            BrowserModule,
            HttpClientModule,
            SharedModule,
            AccountModule,
            DashboardModule,
            AppRoutingModule,
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
], AppModule);
export { AppModule };
//# sourceMappingURL=app.module.js.map