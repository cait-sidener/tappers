import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbSlideEvent, NgbSlideEventSource, NgbCarousel } from '@ng-bootstrap/ng-bootstrap';
import { fadeInAnimation } from '../../shared/navigation/route-animations';

@Component({
    selector: 'app-archive-pics',
    templateUrl: './archive-pics.component.html',
    styleUrls: ['./archive-pics.component.css'],
    animations: [fadeInAnimation],
    host: { '[@fadeInAnimation]': '' }
})
export class ArchivePicsComponent implements OnInit {
    showNavigationArrows = true;
    showNavigationIndicators = true;
    pauseOnHover = true;

    @ViewChild('mycarousel', { static: true }) carousel: NgbCarousel;


    constructor() {
    }
    ngOnInit() { }

    startCarousel() {
        this.carousel.cycle();
    }

    pauseCarousel() {
        this.carousel.pause();
    }

    moveNext() {
        this.carousel.next();
    }

    getPrev() {
        this.carousel.prev();
    }

    goToSlide(slide: any) {
        this.carousel.select(slide);
    }
}
