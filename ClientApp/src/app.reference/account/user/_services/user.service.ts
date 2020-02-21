import { Injectable, Inject, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { IUser } from '../user';

@Injectable({
	providedIn: 'root' //Singleton
})
export class AccountUserService {
	@Output() data_changed: EventEmitter<number> = new EventEmitter(true); //Async; Doesn't need to wait

	userList_Saved: IUser[] = [];

	private apiUrl = 'api/Account';

	constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

	getUsers(): Observable<IUser[]> {
		return this.http.get<IUser[]>(new URL(`${this.apiUrl}/GetUsers`, this.baseUrl).href).pipe(
			tap(data => console.log('User Data:', data)), catchError(this.handleError)
		);
	}

	getUser(id: number): Observable<IUser> {
		return this.http.get<IUser>(new URL(`${this.apiUrl}/GetUser/${id}`, this.baseUrl).href).pipe(
			tap(data => console.log(`User ${id} Data:`, data)), catchError(this.handleError)
		);
	}

	updateUser(user: IUser): Observable<boolean> {
		return this.http.post(new URL(`${this.apiUrl}/UpdateUser`, this.baseUrl).href, user, { observe: 'response' }).pipe(
			map((response: HttpResponse<any>) => {
				this.data_changed.emit(user.userID);
				return response.status === 200;
			}),
			tap(data => console.log(`User ${user.userID} Updated:`, data)),
			catchError(this.handleError)
		);
	}

	private handleError(err: HttpErrorResponse): Observable<never> {
		let errorMessage = '';
		if (err.error instanceof ErrorEvent) errorMessage = `Error: ${err.error.message}.`
		else errorMessage = `Status Code: ${err.status}, Error: ${err.message}.`
		return throwError(errorMessage);
	}
}
