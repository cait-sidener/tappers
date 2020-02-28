import { Component, OnInit, Input } from '@angular/core';
import * as $ from 'jquery';
import 'fullcalendar';
import * as moment from 'moment';
import { OptionsInput, EventObjectInput } from 'fullcalendar';
import interactionPlugin from '@fullcalendar/interaction'; // for selectable
import dayGridPlugin from '@fullcalendar/daygrid'; // for dayGridMonth view
import { Calendar, EventInput } from '@fullcalendar/core';
import { ModalService } from '../../shared/modal/_services';
import { AddEventComponent } from '../add-event/add-event.component';
import { CalendarService } from '../_services';
import { UserService } from '../../account/user.service';
import { startWith } from 'rxjs/operators';
import { AngularFirestoreDocument, DocumentData } from '@angular/fire/firestore';

@Component({
    selector: 'app-calendar-form',
    templateUrl: './calendar-form.component.html',
    styleUrls: ['./calendar-form.component.css']
})
export class CalendarFormComponent implements OnInit {
    calendar?: Calendar;
    calanderDiv?: HTMLElement;
    constructor(private modalService: ModalService, private calendarService: CalendarService, public auth: UserService) {

    }

    ngOnInit() {
        this.calanderDiv = document.getElementById('full-calendar')!;
        this.auth.state_changed.pipe(
            startWith(null)
        ).subscribe(userData => {
            if (this.calendar) this.calendar.destroy();
            console.log(userData);
            this.calendar = new Calendar(this.calanderDiv, {
                buttonText: {
                    today: 'TODAY'
                },
                customButtons: (userData && userData.isOwner) ? {
                    event: {
                        text: '+',
                        click: () => {
                            this.modalService.show(AddEventComponent, { title: 'Add an Event' });
                        }
                    }
                } : {},
                events: (fetchInfo, successCallback) => {
                    this.calendarService.getEvents(fetchInfo, successCallback)
                },
                eventBackgroundColor: '#507169',
                eventBorderColor: '#507169',
                eventTextColor: '#e2c7ac',
                displayEventTime: false,
                header: {
                    left: 'event',
                    center: 'title',
                    right: 'prev, today, next'
                },
                height: 'auto',
                plugins: [dayGridPlugin, interactionPlugin],
                selectable: true,
            });
            this.calendar.render();
        });
        this.calendarService.refreshCalendar().subscribe(() => {
            this.calendar?.refetchEvents();
        });
    }
    //@Input()
    //set configurations(config: any) {
    //    if (config) {
    //        this.defaultConfigurations = config;
    //    }
    //}
    //@Input() eventData: EventObjectInput[];

    //defaultConfigurations: OptionsInput; //TODO

    //constructor() {
    //    let calendar = new Calendar($('#full-calendar')[0], {
    //        plugins: [interactionPlugin, dayGridPlugin],
    //        defaultView: 'dayGridMonth',
    //        editable: true,
    //        eventLimit: true,
    //        titleFormat: 'MMM D YYYY',
    //        header: {
    //            left: 'prev,next today',
    //            center: 'title',
    //            right: 'month,agendaWeek,agendaDay'
    //        },
    //        buttonText: {
    //            today: 'Today',
    //            month: 'Month',
    //            week: 'Week',
    //            day: 'Day'
    //        },
    //        views: {
    //            agenda: {
    //                eventLimit: 2
    //            }
    //        },
    //        allDaySlot: false,
    //        slotDuration: moment.duration('00:15:00'),
    //        slotLabelInterval: moment.duration('01:00:00'),
    //        firstDay: 1,
    //        selectable: true,
    //        //selectHelper: true,
    //        events: this.eventData,
    //        dayClick: (date: moment.Moment, jsEvent: MouseEvent, activeView: any) => {
    //            this.dayClick(date, jsEvent, activeView);
    //        },
    //        eventDragStart: (eventObject, jsEvent, activeView) => {
    //            console.log(eventObject);
    //            this.eventDragStart(
    //                eventObject, jsEvent, activeView
    //            );
    //        },
    //        eventDragStop: (eventObject, jsEvent, activeView) => {
    //            console.log(eventObject);
    //            this.eventDragStop(
    //                eventObject, jsEvent, activeView
    //            );
    //        },
    //    });
    //    this.eventData = [
    //        {
    //            title: 'event1',
    //            start: moment()
    //        }];
    //    this.defaultConfigurations = {
    //        plugins: [interactionPlugin, dayGridPlugin],
    //        defaultView: 'dayGridMonth',
    //        editable: true,
    //        eventLimit: true,
    //        titleFormat: 'MMM D YYYY',
    //        header: {
    //            left: 'prev,next today',
    //            center: 'title',
    //            right: 'month,agendaWeek,agendaDay'
    //        },
    //        buttonText: {
    //            today: 'Today',
    //            month: 'Month',
    //            week: 'Week',
    //            day: 'Day'
    //        },
    //        views: {
    //            agenda: {
    //                eventLimit: 2
    //            }
    //        },
    //        allDaySlot: false,
    //        slotDuration: moment.duration('00:15:00'),
    //        slotLabelInterval: moment.duration('01:00:00'),
    //        firstDay: 1,
    //        selectable: true,
    //        selectHelper: true,
    //        events: this.eventData,
    //        dayClick: (date, jsEvent, activeView) => {
    //            this.dayClick(date, jsEvent, activeView);
    //        },
    //        eventDragStart: (eventObject, jsEvent, activeView) => {
    //            console.log(eventObject);
    //            this.eventDragStart(
    //                eventObject, jsEvent, activeView
    //            );
    //        },
    //        eventDragStop: (eventObject, jsEvent, activeView) => {
    //            console.log(eventObject);
    //            this.eventDragStop(
    //                eventObject, jsEvent, activeView
    //            );
    //        },
    //    };
    //}


    //ngOnInit() {
    //    $('#full-calendar').fullCalendar(
    //        this.defaultConfigurations
    //    );
    //}
}
