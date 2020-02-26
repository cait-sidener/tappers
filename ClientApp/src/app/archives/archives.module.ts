import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { SharedModule } from '../shared/shared.module';
import { ArchivePicsComponent } from './archive-pics/archive-pics.component';


@NgModule({
    declarations: [
        ArchivePicsComponent
    ],
    imports: [
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFirestoreModule,
        AngularFireDatabaseModule,
        BrowserAnimationsModule,
        CommonModule,
        FormsModule,
        SharedModule
    ],
    providers: [
    ]
})
export class ArchivesModule { }
