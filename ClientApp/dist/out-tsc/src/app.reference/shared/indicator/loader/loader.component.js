import { __decorate, __metadata } from "tslib";
import { Component, ChangeDetectionStrategy, Input, ChangeDetectorRef } from '@angular/core';
let LoaderComponent = class LoaderComponent {
    //0 - Small
    //1 - Large
    constructor(cdr) {
        this.cdr = cdr;
        this.text = '';
        this.type = 0;
    }
    check() {
        this.cdr.markForCheck();
    }
    ngOnInit() {
        this.check();
    }
};
__decorate([
    Input(),
    __metadata("design:type", String)
], LoaderComponent.prototype, "text", void 0);
__decorate([
    Input(),
    __metadata("design:type", Number)
], LoaderComponent.prototype, "type", void 0);
LoaderComponent = __decorate([
    Component({
        selector: 'app-loader',
        templateUrl: './loader.component.html',
        styleUrls: ['./loader.component.scss'],
        changeDetection: ChangeDetectionStrategy.OnPush
    }),
    __metadata("design:paramtypes", [ChangeDetectorRef])
], LoaderComponent);
export { LoaderComponent };
//# sourceMappingURL=loader.component.js.map