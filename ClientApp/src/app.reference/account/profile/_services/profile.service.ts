import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
	providedIn: 'root' //Singleton
})
export class ProfileService {
	private apiUrl = 'api/Account/ProtectedResponse';

	constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

	getData(): Observable<string> {
		return this.http.get(new URL(this.apiUrl, this.baseUrl).href, { responseType: "text" }).pipe(
			tap(data => console.log('Protected Data:', data)), catchError(this.handleError)
		);
	}

	private handleError(err: HttpErrorResponse): Observable<never> {
		let errorMessage = '';
		if (err.error instanceof ErrorEvent) errorMessage = `Error: ${err.error.message}.`
		else errorMessage = `Status Code: ${err.status}, Error: ${err.message}.`
		return throwError(errorMessage);
	}
}
