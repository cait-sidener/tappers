import { __decorate, __metadata } from "tslib";
import { Injectable, ComponentFactoryResolver, ApplicationRef, Injector } from '@angular/core';
let DOMService = class DOMService {
    constructor(componentFactoryResolver, appRef, injector) {
        this.componentFactoryResolver = componentFactoryResolver;
        this.appRef = appRef;
        this.injector = injector;
    }
    appendComponentTo(parentId, child, childConfig) {
        const childComponentRef = this.componentFactoryResolver.resolveComponentFactory(child).create(this.injector); //Component Reference from Component
        Object.assign(childComponentRef.instance, childConfig);
        this.appRef.attachView(childComponentRef.hostView);
        const childDomElem = childComponentRef.hostView.rootNodes[0];
        document.getElementById(parentId).appendChild(childDomElem); //Assumed to exist ('!'), will throw error if not.
        return childComponentRef;
    }
    removeComponent(componentRef) {
        this.appRef.detachView(componentRef.hostView);
        componentRef.destroy();
    }
};
DOMService = __decorate([
    Injectable({
        providedIn: 'root' //Singleton
    }),
    __metadata("design:paramtypes", [ComponentFactoryResolver, ApplicationRef, Injector])
], DOMService);
export { DOMService };
//# sourceMappingURL=dom.service.js.map