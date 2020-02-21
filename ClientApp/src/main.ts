import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

export function getBaseUrl(): string {
	return document.getElementsByTagName('base')[0].href;
}

const providers = [
	{ provide: 'BASE_URL', useFactory: getBaseUrl, deps: <any>[] },
	{ provide: 'AD_PROVIDER_URL', useValue: 'https://devnet.ksdot.org/ADprovider/' },
	{ provide: 'APP_ID', useValue: 1 }
];

if (environment.production) {
	enableProdMode();
}

platformBrowserDynamic(providers).bootstrapModule(AppModule).catch(err => console.error(err));

//Simple Ripple Animation
//https://jsfiddle.net/mcdowgav/5acjzpfb/
document.querySelector('html')!.addEventListener('click', function (e) { //Event on HTML element for SPA support.
	if ((e.target as HTMLElement).classList.contains('btn-animated')) {
		const getElementOffset = function (element: HTMLElement): { top: number, left: number } {
			let
				de: HTMLElement = document.documentElement,
				box: ClientRect | DOMRect = element.getBoundingClientRect(),
				top: number = box.top + window.pageYOffset - de.clientTop,
				left: number = box.left + window.pageXOffset - de.clientLeft;
			return {
				top: top,
				left: left
			};
		};
		let
			duration: number = 750,
			btn: HTMLElement = e.target as HTMLElement,
			btnOffsets: { top: number, left: number } = getElementOffset(btn),
			animFrame: number, animStart: number,
			animStep = function (ts: number) {
				if (!animStart) animStart = ts;
				let frame = ts - animStart;
				if (frame < duration) {
					let
						easing = frame / duration * (2 - frame / duration),
						circle = `circle at ${e.pageX - btnOffsets.left}px ${e.pageY - btnOffsets.top}px`,
						color = `rgba(255, 255, 255, ${0.25 * (1 - easing)})`,
						stop = `${90 * easing}%`;
					btn.style.backgroundImage = `radial-gradient(${circle}, ${color} ${stop}, transparent ${stop})`;
					animFrame = window.requestAnimationFrame(animStep);
				} else {
					btn.style.backgroundImage = 'none';
					window.cancelAnimationFrame(animFrame);
				}
			};
		animFrame = window.requestAnimationFrame(animStep);
	}
});
