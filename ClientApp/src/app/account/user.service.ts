
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from './user';

@Injectable({
	providedIn: 'root'
})
export class UserService {
	private eventAuthError = new BehaviorSubject<string>('');
	eventAuthError$ = this.eventAuthError.asObservable();

	newUser: any;
	constructor(
		public afAuth: AngularFireAuth,
		private db: AngularFirestore,
		private router: Router,
	) { }

	createUser(user: { email: string; password: string; firstName: string; lastName: string; }) {
		this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password)
			.then(userCredentials => {
				this.newUser = user;
				userCredentials.user!.updateProfile({
					displayName: user.firstName + ' ' + user.lastName
				});
				this.insertUserData(userCredentials)
					.then(() => {
						this.router.navigate(['/']);
					});
			})
			.catch(error => {
				this.eventAuthError.next(error);
		})
	}


	insertUserData(userCredential: firebase.auth.UserCredential) {
		return this.db.doc(`users\${userCredential.user.uid}`).set({
			email: this.newUser.email,
			firstname: this.newUser.firstName,
			lastname: this.newUser.lastName,
			role: 'user'
		})
	}
}
