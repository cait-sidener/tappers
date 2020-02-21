import { Injectable, EventEmitter } from "@angular/core";
import { Observable, of } from 'rxjs';
import { EventObjectInput } from 'fullcalendar';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';
import 'firebase/firestore';
import { ICalendarEvent } from '../CalendarEvent';
import * as firebase from 'firebase';

@Injectable({
    providedIn: 'root'
})
export class CalendarService {

    constructor(private afs: AngularFirestore, private db: AngularFireDatabase) {
    }
    // Gets and Refreshes Calendar
    refreshCalendar(): Observable<any[]> {
        return this.afs.collection('calendarEvents').valueChanges();
    }

    getEvents(fetchInfo: { start: any; end: any; }, callback: (arg0: any[]) => void) {
        var coll = this.afs.collection('calendarEvents', ref =>
            ref.orderBy('start').startAt(fetchInfo.start).endAt(fetchInfo.end));
        var promise = coll.get().toPromise();
        var events: any[] = [];
        promise.then(querySnapshot => {
            querySnapshot.forEach(doc => {
                let e: any = doc.data();
                e.start = e.start.toDate();
                events.push(e);
            });
            console.log(events);
            callback(events)
        })
    }

    // Add
    addEvent(event: ICalendarEvent): void {
        this.afs.collection('calendarEvents').add(event);
    }

    // Delete
    deleteEvent(id: string): void {
        this.afs.collection('calendarEvents').doc(id).delete();
    }

}
