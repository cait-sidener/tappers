import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';


@Component({
	//selector: 'app-login', //Used in routing; doesn't need a tag selector.
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
	authError: any;

	constructor(public auth: UserService) { }

	ngOnInit() {
	}
}
