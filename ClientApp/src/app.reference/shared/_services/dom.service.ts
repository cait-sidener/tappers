import { Injectable, ComponentFactoryResolver, ApplicationRef, Injector, ComponentRef, EmbeddedViewRef } from '@angular/core';

@Injectable({
	providedIn: 'root' //Singleton
})
export class DOMService { //Provides easy DOM manipulation using components
	constructor(private componentFactoryResolver: ComponentFactoryResolver, private appRef: ApplicationRef, private injector: Injector) { }

	appendComponentTo(parentId: string, child: any, childConfig?: Object): ComponentRef<any> {
		const childComponentRef: ComponentRef<any> = this.componentFactoryResolver.resolveComponentFactory(child).create(this.injector); //Component Reference from Component
		Object.assign(childComponentRef.instance, childConfig);
		this.appRef.attachView(childComponentRef.hostView);
		const childDomElem: HTMLElement = (childComponentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
		document.getElementById(parentId)!.appendChild(childDomElem); //Assumed to exist ('!'), will throw error if not.
		return childComponentRef;
	}

	removeComponent(componentRef: ComponentRef<any>): void {
		this.appRef.detachView(componentRef.hostView);
		componentRef.destroy();
	}
}
