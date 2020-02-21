import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush //This applies to children as well. Prevents default change detection; it is inefficient to update EVERY component when one thing changes.
})
export class AppComponent {
}
