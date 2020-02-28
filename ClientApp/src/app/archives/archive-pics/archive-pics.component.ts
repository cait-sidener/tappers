import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbSlideEvent, NgbSlideEventSource, NgbCarousel } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-archive-pics',
  templateUrl: './archive-pics.component.html',
  styleUrls: ['./archive-pics.component.css']
})
export class ArchivePicsComponent implements OnInit {
    images = [1, 2, 3].map(() => `https://picsum.photos/900/500?random&t=${Math.random()}`);
    showNavigationArrows = true;
    showNavigationIndicators = true;
    pauseOnHover = true;

    @ViewChild('mycarousel', { static: true }) carousel: NgbCarousel;


    constructor() {      
    }
    ngOnInit() {}

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
