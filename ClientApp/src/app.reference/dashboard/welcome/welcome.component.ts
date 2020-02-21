import { Component, Input, ChangeDetectorRef, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { AuthService } from '../../shared/security/_services/auth.service';

@Component({
	//selector: 'app-welcome', //Used in routing; doesn't need a tag selector.
	templateUrl: './welcome.component.html',
	styleUrls: ['./welcome.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class WelcomeComponent implements OnInit {
	@Input() id!: number; //Value isn't set on creation but is available on init.

	displayName: string = '';

	constructor(private cdr: ChangeDetectorRef, private authService: AuthService) {
		this.cdr.detach();
	}

	check(): void { //Always run check if changes in component need to be reflected on view.
		this.cdr.detectChanges();
	}

	ngOnInit(): void {
		let
			updated: boolean = false,
			storageItem: any = this.authService.getStorageItem();
		if (this.id) updated = true;
		if (storageItem) {
			this.displayName = storageItem['displayName'];
			updated = true;
		}
		if (updated) this.check(); //Changes were made and need to be rendered.
	}
}
