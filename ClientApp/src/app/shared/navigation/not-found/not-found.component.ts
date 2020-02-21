import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
	//selector: 'app-not-found', //Used in routing; doesn't need a tag selector.
	templateUrl: './not-found.component.html',
	styleUrls: ['./not-found.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotFoundComponent { }
