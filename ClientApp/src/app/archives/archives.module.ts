import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from '../shared/shared.module';
import { ArchivePicsComponent } from './archive-pics/archive-pics.component';
import { ImageUploadComponent } from './image-upload/image-upload.component';
import { ArchivesRoutingModule } from './archives-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
    declarations: [
        ArchivePicsComponent,
        ImageUploadComponent
    ],
    exports: [
        ArchivePicsComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        ArchivesRoutingModule,
        CommonModule,
        FormsModule,
        NgbModule,
        SharedModule
    ],
    bootstrap: [
        ArchivePicsComponent
    ]
})
export class ArchivesModule { }
