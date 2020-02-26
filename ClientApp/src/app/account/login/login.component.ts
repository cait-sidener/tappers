import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import * as firebaseui from 'firebaseui';
import * as firebase from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
	//selector: 'app-login', //Used in routing; doesn't need a tag selector.
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
    ui!: firebaseui.auth.AuthUI;
    constructor(public afAuth: AngularFireAuth, private router: Router) { }

    ngOnInit(): void {
        const uiConfig = {
            signInSuccessUrl: '/calendar',
            signInOptions: [
                {
                    provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
                    authMethod: 'https://accounts.google.com'

                }],
            tosUrl: 'https://ajonp.com/tos',
            privacyPolicyUrl: function () {
                window.location.assign(
                    'https://ajonp.com/privacy'
                );
            }
        };
        this.ui = new firebaseui.auth.AuthUI(this.afAuth.auth);
        this.ui.start('#firebaseui-auth-container', uiConfig);
    }
}
