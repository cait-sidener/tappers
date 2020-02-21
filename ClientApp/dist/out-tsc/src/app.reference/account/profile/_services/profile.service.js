import { __decorate, __metadata, __param } from "tslib";
import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
let ProfileService = class ProfileService {
    constructor(http, baseUrl) {
        this.http = http;
        this.baseUrl = baseUrl;
        this.apiUrl = 'api/Account/ProtectedResponse';
    }
    getData() {
        return this.http.get(new URL(this.apiUrl, this.baseUrl).href, { responseType: "text" }).pipe(tap(data => console.log('Protected Data:', data)), catchError(this.handleError));
    }
    handleError(err) {
        let errorMessage = '';
        if (err.error instanceof ErrorEvent)
            errorMessage = `Error: ${err.error.message}.`;
        else
            errorMessage = `Status Code: ${err.status}, Error: ${err.message}.`;
        return throwError(errorMessage);
    }
};
ProfileService = __decorate([
    Injectable({
        providedIn: 'root' //Singleton
    }),
    __param(1, Inject('BASE_URL')),
    __metadata("design:paramtypes", [HttpClient, String])
], ProfileService);
export { ProfileService };
//# sourceMappingURL=profile.service.js.map