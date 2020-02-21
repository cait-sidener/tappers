import { __decorate, __metadata } from "tslib";
import { Component, ElementRef, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { ModalService } from './_services';
import { Subscription } from 'rxjs';
let ModalComponent = class ModalComponent {
    constructor(cdr, modalService, elementRef) {
        this.cdr = cdr;
        this.modalService = modalService;
        this.elementRef = elementRef;
        this.subscription = new Subscription();
    }
    check() {
        this.cdr.detectChanges();
    }
    ngOnInit() {
        this.cdr.detach();
        this.subscription.add(this.modalService.modal_added.subscribe((config) => {
            var _a, _b, _c, _d;
            this.title = (_a = config.title, (_a !== null && _a !== void 0 ? _a : ''));
            this.isStatic = (_b = config.isStatic, (_b !== null && _b !== void 0 ? _b : false));
            this.isFullPage = (_c = config.isFullPage, (_c !== null && _c !== void 0 ? _c : false));
            this.showCloseButton = (_d = config.showCloseButton, (_d !== null && _d !== void 0 ? _d : true));
            this.check();
            this.show();
        }));
        this.subscription.add(this.modalService.modal_removing.subscribe(() => this.hide()));
    }
    ngOnDestroy() {
        if (!this.subscription.closed)
            this.subscription.unsubscribe();
    }
    closeModal(event) {
        if (event.target !== event.currentTarget || (event.target.id === 'modal' && this.isStatic))
            return;
        this.modalService.hide();
    }
    show() {
        let nativeElement = this.elementRef.nativeElement.querySelector('#modal');
        //Animations to FadeIn?
        nativeElement.style.display = 'block';
    }
    hide() {
        let nativeElement = this.elementRef.nativeElement.querySelector('#modal');
        //Animations to FadeOut?
        nativeElement.style.display = 'none';
    }
};
ModalComponent = __decorate([
    Component({
        selector: 'app-modal',
        templateUrl: './modal.component.html',
        styleUrls: ['./modal.component.scss'],
        changeDetection: ChangeDetectionStrategy.OnPush
    }),
    __metadata("design:paramtypes", [ChangeDetectorRef, ModalService, ElementRef])
], ModalComponent);
export { ModalComponent };
//# sourceMappingURL=modal.component.js.map