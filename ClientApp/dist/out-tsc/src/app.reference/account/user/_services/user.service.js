import { __decorate, __metadata, __param } from "tslib";
import { Injectable, Inject, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
let AccountUserService = class AccountUserService {
    constructor(http, baseUrl) {
        this.http = http;
        this.baseUrl = baseUrl;
        this.data_changed = new EventEmitter(true); //Async; Doesn't need to wait
        this.userList_Saved = [];
        this.apiUrl = 'api/Account';
    }
    getUsers() {
        return this.http.get(new URL(`${this.apiUrl}/GetUsers`, this.baseUrl).href).pipe(tap(data => console.log('User Data:', data)), catchError(this.handleError));
    }
    getUser(id) {
        return this.http.get(new URL(`${this.apiUrl}/GetUser/${id}`, this.baseUrl).href).pipe(tap(data => console.log(`User ${id} Data:`, data)), catchError(this.handleError));
    }
    updateUser(user) {
        return this.http.post(new URL(`${this.apiUrl}/UpdateUser`, this.baseUrl).href, user, { observe: 'response' }).pipe(map((response) => {
            this.data_changed.emit(user.userID);
            return response.status === 200;
        }), tap(data => console.log(`User ${user.userID} Updated:`, data)), catchError(this.handleError));
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
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], AccountUserService.prototype, "data_changed", void 0);
AccountUserService = __decorate([
    Injectable({
        providedIn: 'root' //Singleton
    }),
    __param(1, Inject('BASE_URL')),
    __metadata("design:paramtypes", [HttpClient, String])
], AccountUserService);
export { AccountUserService };
//# sourceMappingURL=user.service.js.map