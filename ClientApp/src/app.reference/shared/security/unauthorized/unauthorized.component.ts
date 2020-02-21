import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
	//selector: 'app-unauthorized', //Used in routing; doesn't need a tag selector.
	templateUrl: './unauthorized.component.html',
	styleUrls: ['./unauthorized.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class UnauthorizedComponent { }
