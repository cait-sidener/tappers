import { Component, ChangeDetectorRef, Input, Output, EventEmitter, SimpleChanges, OnInit, OnChanges, ChangeDetectionStrategy } from '@angular/core';
import { PaginatorService } from './_services';

@Component({
	selector: 'app-pagination',
	templateUrl: './pagination.component.html',
	styleUrls: ['./pagination.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaginationComponent implements OnInit, OnChanges {
	@Input() items: any[] = [];
	@Input() initialPage: number = 1;
	@Input() maxPages: number = 8;

	private _pageSize: number = 10; //TODO; Not maintaining page size when data refreshes
	get pageSize(): number {
		return this._pageSize;
	}
	@Input() set pageSize(value: number) {
		this._pageSize = value;
		if (this.pager) { //-Probably here is where the reset occurs
			this.setPage(this.initialPage);
		}
	}

	@Output() changePage: EventEmitter<any> = new EventEmitter<any>(true);

	pager: any = {};

	constructor(private cdr: ChangeDetectorRef, private pagerService: PaginatorService) { }

	check(): void { //Always run check if changes in component need to be reflected on view.
		this.cdr.markForCheck(); //Utilize OnPush change detection on parent.
	}

	ngOnInit(): void {
		if (this.items.length) this.setPage(this.initialPage);
		this.check();
	}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes.items.currentValue !== changes.items.previousValue) {
			this.setPage(this.initialPage);
		} else this.check();
	}

	setPage(page: number): void {
		if (this.items.length) {
			this.pager = this.pagerService.paginate(this.items.length, page, this.pageSize, this.maxPages);
			let pageOfItems: any[] = this.items.slice(this.pager.startIndex, this.pager.endIndex + 1);
			this.changePage.emit(pageOfItems);
			this.check();
		}
	}
}
