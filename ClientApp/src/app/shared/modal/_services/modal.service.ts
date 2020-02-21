import { Injectable, ComponentRef, Output, EventEmitter } from '@angular/core';
import { DOMService } from '../../_services';
import { IModal } from '../modal';


@Injectable({
    providedIn: 'root' //Singleton
})
export class ModalService {
    private _visible: boolean = false;
    get isVisible(): boolean {
        return this._visible;
    }
    @Output() modal_added: EventEmitter<IModal> = new EventEmitter(true); //Async; Doesn't need to wait
    @Output() modal_removing: EventEmitter<IModal> = new EventEmitter(false); //Sync; Let the subscriber act first
    private modalContentElementId: string = 'modal-content';
    private modalComponentRef?: ComponentRef<any>;
    constructor(private domService: DOMService) { }
    show(component: any, settings?: IModal, config?: object): void {
        this.modalComponentRef = this.domService.appendComponentTo(this.modalContentElementId, component, config)
        document.getElementsByTagName('body')[0].style.overflow = 'hidden';
        this.modal_added.emit(settings); //Send desired settings
        this._visible = true;
    }
    hide(): void {
        this.modal_removing.emit();
        if (this.modalComponentRef)
            this.domService.removeComponent(this.modalComponentRef);
        document.getElementsByTagName('body')[0].style.overflow = 'auto';
        this._visible = false;
    }
}
