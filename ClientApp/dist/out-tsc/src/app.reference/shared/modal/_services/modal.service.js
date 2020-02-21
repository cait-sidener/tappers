import { __decorate, __metadata } from "tslib";
import { Injectable, Output, EventEmitter } from '@angular/core';
import { DOMService } from '../../_services';
let ModalService = class ModalService {
    constructor(domService) {
        this.domService = domService;
        this._visible = false;
        this.modal_added = new EventEmitter(true); //Async; Doesn't need to wait
        this.modal_removing = new EventEmitter(false); //Sync; Let the subscriber act first
        this.modalContentElementId = 'modal-content';
    }
    get isVisible() {
        return this._visible;
    }
    show(component, settings, config) {
        this.modalComponentRef = this.domService.appendComponentTo(this.modalContentElementId, component, config);
        document.getElementsByTagName('body')[0].style.overflow = 'hidden';
        this.modal_added.emit(settings); //Send desired settings
        this._visible = true;
    }
    hide() {
        this.modal_removing.emit();
        if (this.modalComponentRef)
            this.domService.removeComponent(this.modalComponentRef);
        document.getElementsByTagName('body')[0].style.overflow = 'auto';
        this._visible = false;
    }
};
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], ModalService.prototype, "modal_added", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], ModalService.prototype, "modal_removing", void 0);
ModalService = __decorate([
    Injectable({
        providedIn: 'root' //Singleton
    }),
    __metadata("design:paramtypes", [DOMService])
], ModalService);
export { ModalService };
//# sourceMappingURL=modal.service.js.map