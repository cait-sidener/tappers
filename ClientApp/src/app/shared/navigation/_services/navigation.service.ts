import { Injectable, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Router, Event, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';

@Injectable({
	providedIn: 'root' //Singleton
})
export class NavigationService implements OnDestroy {
	@Output() visiblity_changed: EventEmitter<boolean> = new EventEmitter<boolean>(false);

	private _visible: boolean = true;
	private _prevURL: string = '/';
	private _currURL: string = '/';

	set visible(value: boolean) {
		this._visible = value;
		this.visiblity_changed.emit(value);
	}
	get visible(): boolean {
		return this._visible;
	}

	get previousURL(): string {
		return this._prevURL
	}

	private subscription: Subscription = new Subscription(); //Acts as a container for multiple subscriptions by using the Add function.

	constructor(private router: Router) {
		this._currURL = this.router.url;
		this.subscription.add(router.events.subscribe(
			(event: Event) => {
				if (event instanceof NavigationEnd) {
					this._prevURL = this._currURL;
					this._currURL = this.router.url;
				}
			}
		));
	}

	ngOnDestroy(): void {
		if (!this.subscription.closed) //CYA; Always unsubscribe on destroy event to prevent memory leaks.
			this.subscription.unsubscribe();
	}
}
