import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login-home',
    templateUrl: './login-home.component.html',
    styleUrls: ['./login-home.component.css'],
})
export class LoginHomeComponent implements OnInit {
    user: firebase.auth.UserCredential;

    constructor(private userService: UserService, private router: Router) { }

    ngOnInit() {
    }
}
