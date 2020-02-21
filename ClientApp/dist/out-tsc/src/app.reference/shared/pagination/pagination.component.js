import { __decorate, __metadata } from "tslib";
import { Component, ChangeDetectorRef, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { PaginatorService } from './_services';
let PaginationComponent = class PaginationComponent {
    constructor(cdr, pagerService) {
        this.cdr = cdr;
        this.pagerService = pagerService;
        this.items = [];
        this.initialPage = 1;
        this.maxPages = 8;
        this._pageSize = 10; //TODO; Not maintaining page size when data refreshes
        this.changePage = new EventEmitter(true);
        this.pager = {};
    }
    get pageSize() {
        return this._pageSize;
    }
    set pageSize(value) {
        this._pageSize = value;
        if (this.pager) { //-Probably here is where the reset occurs
            this.setPage(this.initialPage);
        }
    }
    check() {
        this.cdr.markForCheck(); //Utilize OnPush change detection on parent.
    }
    ngOnInit() {
        if (this.items.length)
            this.setPage(this.initialPage);
        this.check();
    }
    ngOnChanges(changes) {
        if (changes.items.currentValue !== changes.items.previousValue) {
            this.setPage(this.initialPage);
        }
        else
            this.check();
    }
    setPage(page) {
        if (this.items.length) {
            this.pager = this.pagerService.paginate(this.items.length, page, this.pageSize, this.maxPages);
            let pageOfItems = this.items.slice(this.pager.startIndex, this.pager.endIndex + 1);
            this.changePage.emit(pageOfItems);
            this.check();
        }
    }
};
__decorate([
    Input(),
    __metadata("design:type", Array)
], PaginationComponent.prototype, "items", void 0);
__decorate([
    Input(),
    __metadata("design:type", Number)
], PaginationComponent.prototype, "initialPage", void 0);
__decorate([
    Input(),
    __metadata("design:type", Number)
], PaginationComponent.prototype, "maxPages", void 0);
__decorate([
    Input(),
    __metadata("design:type", Number),
    __metadata("design:paramtypes", [Number])
], PaginationComponent.prototype, "pageSize", null);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], PaginationComponent.prototype, "changePage", void 0);
PaginationComponent = __decorate([
    Component({
        selector: 'app-pagination',
        templateUrl: './pagination.component.html',
        styleUrls: ['./pagination.component.scss'],
        changeDetection: ChangeDetectionStrategy.OnPush
    }),
    __metadata("design:paramtypes", [ChangeDetectorRef, PaginatorService])
], PaginationComponent);
export { PaginationComponent };
//# sourceMappingURL=pagination.component.js.map