import { __decorate, __metadata } from "tslib";
import { Component } from '@angular/core';
import 'fullcalendar';
import interactionPlugin from '@fullcalendar/interaction'; // for selectable
import dayGridPlugin from '@fullcalendar/daygrid'; // for dayGridMonth view
import { Calendar } from '@fullcalendar/core';
import { ModalService } from '../../shared/modal/_services';
import { AddEventComponent } from '../add-event/add-event.component';
import { CalendarService } from '../_services';
let CalendarFormComponent = class CalendarFormComponent {
    constructor(modalService, calendarService) {
        this.modalService = modalService;
        this.calendarService = calendarService;
    }
    ngOnInit() {
        var calendarDiv = document.getElementById('full-calendar');
        this.calendar = new Calendar(calendarDiv, {
            plugins: [dayGridPlugin, interactionPlugin],
            selectable: true,
            //events: this.calendarService.getEvents(),
            events: (fetchInfo, successCallback) => {
                this.calendarService.getEvents(fetchInfo, successCallback);
            },
            dateClick: (args) => {
                //if user is authenticated
                if (true) {
                    this.modalService.show(AddEventComponent, { title: 'Add an Event' }, { date: args.date });
                }
            }
        });
        this.calendarService.refreshCalendar().subscribe(() => {
            var _a;
            (_a = this.calendar) === null || _a === void 0 ? void 0 : _a.refetchEvents();
        });
        this.calendar.render();
    }
};
CalendarFormComponent = __decorate([
    Component({
        selector: 'app-calendar-form',
        templateUrl: './calendar-form.component.html',
        styleUrls: ['./calendar-form.component.css']
    }),
    __metadata("design:paramtypes", [ModalService, CalendarService])
], CalendarFormComponent);
export { CalendarFormComponent };
//# sourceMappingURL=calendar-form.component.js.map