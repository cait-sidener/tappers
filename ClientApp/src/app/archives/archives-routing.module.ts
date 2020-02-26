import { Routes, RouterModule } from "@angular/router";
import { ArchivePicsComponent } from './archive-pics/archive-pics.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
    { path: 'archives', component: ArchivePicsComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ArchivesRoutingModule { }
