import { Injectable, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument, DocumentData } from '@angular/fire/firestore';

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

interface User {
    uid: string;
    email: string;
    photoURL?: string;
    displayName?: string;
    isOwner?: false;
}

@Injectable({
    providedIn: 'root'
})
export class UserService {
    user$: Observable<User>;
    state_changed: EventEmitter<DocumentData> = new EventEmitter<DocumentData>();

    constructor(private afAuth: AngularFireAuth,
        private afs: AngularFirestore,
        private router: Router) {
        this.user$ = this.afAuth.authState.pipe(
            switchMap(user => {
                if (user) {
                    let userData = this.afs.doc<User>(`users/${user.uid}`);
                    userData.get({
                        source: "server"
                    }).subscribe(doc => {
                        this.state_changed.emit(doc.data());
                    });
                    return userData.valueChanges();
                } else {
                    return of(null);
                }
            })
        );
    };

    async googleSignin() {
        const provider = new auth.GoogleAuthProvider();
        const credential = await this.afAuth.auth.signInWithPopup(provider);
        return this.updateUserData(credential.user);
    }

    async signOut() {
        await this.afAuth.auth.signOut();
        this.state_changed.emit(null);
        return this.router.navigate(['/']);
    }

    updateUserData({ uid, email, displayName, photoURL }: User) {
        const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${uid}`);

        const data = {
            uid,
            email,
            displayName,
            photoURL
        };

        return userRef.set(data, { merge: true });
    }
}
