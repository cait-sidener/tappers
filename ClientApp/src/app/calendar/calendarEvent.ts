import * as firebase from 'firebase';

export interface ICalendarEvent {
    id?: string;
    title?: string;
    start?: firebase.firestore.Timestamp;
    end?: firebase.firestore.Timestamp;
}
