import { __decorate, __metadata } from "tslib";
import { Component, Input } from '@angular/core';
import { CalendarService } from '../_services';
import { ModalService } from '../../shared/modal/_services';
import * as firebase from 'firebase';
let AddEventComponent = class AddEventComponent {
    constructor(calendarService, modalService) {
        this.calendarService = calendarService;
        this.modalService = modalService;
        this.submitted = false;
    }
    ngOnInit() {
        this.startDate = this.date;
    }
    onSubmit() {
        this.submitted = true;
        if (this.startDate && this.title) {
            this.calendarService.addEvent({
                title: this.title,
                start: firebase.firestore.Timestamp.fromDate(new Date(this.startDate)),
                end: (this.endDate) ? firebase.firestore.Timestamp.fromDate(new Date(this.endDate)) : firebase.firestore.Timestamp.fromDate(new Date(this.startDate))
            });
        }
        this.modalService.hide();
    }
};
__decorate([
    Input(),
    __metadata("design:type", Date)
], AddEventComponent.prototype, "date", void 0);
AddEventComponent = __decorate([
    Component({
        selector: 'app-add-event',
        templateUrl: './add-event.component.html',
        styleUrls: ['./add-event.component.css']
    }),
    __metadata("design:paramtypes", [CalendarService, ModalService])
], AddEventComponent);
export { AddEventComponent };
//# sourceMappingURL=add-event.component.js.map