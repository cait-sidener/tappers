import { __decorate, __metadata } from "tslib";
import { Injectable } from "@angular/core";
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireDatabase } from '@angular/fire/database';
import 'firebase/firestore';
let CalendarService = class CalendarService {
    constructor(afs, db) {
        this.afs = afs;
        this.db = db;
    }
    // Gets and Refreshes Calendar
    refreshCalendar() {
        return this.afs.collection('calendarEvents').valueChanges();
    }
    getEvents(fetchInfo, callback) {
        var coll = this.afs.collection('calendarEvents', ref => ref.orderBy('start').startAt(fetchInfo.start).endAt(fetchInfo.end));
        var promise = coll.get().toPromise();
        var events = [];
        promise.then(querySnapshot => {
            querySnapshot.forEach(doc => {
                let e = doc.data();
                e.start = e.start.toDate();
                events.push(e);
            });
            console.log(events);
            callback(events);
        });
    }
    // Add
    addEvent(event) {
        this.afs.collection('calendarEvents').add(event);
    }
    // Delete
    deleteEvent(id) {
        this.afs.collection('calendarEvents').doc(id).delete();
    }
};
CalendarService = __decorate([
    Injectable({
        providedIn: 'root'
    }),
    __metadata("design:paramtypes", [AngularFirestore, AngularFireDatabase])
], CalendarService);
export { CalendarService };
//# sourceMappingURL=calendar.service.js.map