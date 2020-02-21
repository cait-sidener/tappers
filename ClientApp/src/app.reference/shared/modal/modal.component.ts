import { Component, AfterViewInit, ElementRef, OnDestroy, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { ModalService } from './_services';
import { IModal } from './modal';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-modal',
	templateUrl: './modal.component.html',
	styleUrls: ['./modal.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModalComponent implements OnInit, OnDestroy {
	title?: string;
	isFullPage?: boolean;
	isStatic?: boolean;
	showCloseButton?: boolean;
	private subscription: Subscription = new Subscription();
	constructor(private cdr: ChangeDetectorRef, private modalService: ModalService, private elementRef: ElementRef) { }
	check(): void { //Always run check if changes in component need to be reflected on view.
		this.cdr.detectChanges();
	}
	ngOnInit(): void {
		this.cdr.detach();
		this.subscription.add(this.modalService.modal_added.subscribe((config: IModal) => {
			this.title = config.title ?? '';
			this.isStatic = config.isStatic ?? false;
			this.isFullPage = config.isFullPage ?? false;
			this.showCloseButton = config.showCloseButton ?? true;
			this.check();
			this.show();
		}));
		this.subscription.add(this.modalService.modal_removing.subscribe(() => this.hide()));
	}
	ngOnDestroy(): void {
		if (!this.subscription.closed)
			this.subscription.unsubscribe();
	}
	closeModal(event: { target: any; currentTarget: any; }) {
		if (event.target !== event.currentTarget || (event.target.id === 'modal' && this.isStatic)) return;
		this.modalService.hide();
	}
	private show() {
		let nativeElement: any = this.elementRef.nativeElement.querySelector('#modal');
		//Animations to FadeIn?
		nativeElement.style.display = 'block';
	}
	private hide() {
		let nativeElement: any = this.elementRef.nativeElement.querySelector('#modal');
		//Animations to FadeOut?
		nativeElement.style.display = 'none';
	}
}
