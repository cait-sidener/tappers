import { Component, Input, ChangeDetectorRef, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { AuthService } from '../shared/security/_services';

@Component({
	//selector: 'app-dashboard', //Used in routing; doesn't need a tag selector.
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit {
	@Input() id?: number; //Value isn't set on creation but is available on init.

	displayName: string = '';

	constructor(private cdr: ChangeDetectorRef, private authService: AuthService) { }

	check(): void { //Always run check if changes in component need to be reflected on view.
		this.cdr.detectChanges();
	}

	ngOnInit(): void {
		this.cdr.detach();
		let updated: boolean = false;
		if (this.id) updated = true;
		if (this.authService.isAuthenticated()) {
			this.displayName = this.authService.getTokenValue('unique_name');
			updated = true;
		}
		if (updated) this.check(); //Changes were made and need to be rendered.
	}
}
