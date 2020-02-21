import { Component, OnInit, Input } from '@angular/core';
import { CalendarService } from '../_services';
import { ModalService } from '../../shared/modal/_services';
import { ICalendarEvent } from '../CalendarEvent';
import * as firebase from 'firebase';

@Component({
    selector: 'app-add-event',
    templateUrl: './add-event.component.html',
    styleUrls: ['./add-event.component.css']
})
export class AddEventComponent implements OnInit {
    @Input() date!: Date;
    submitted = false;
    title?: string;
    startDate?: Date;
    endDate?: Date;

    constructor(private calendarService: CalendarService, private modalService: ModalService) { }

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
}
