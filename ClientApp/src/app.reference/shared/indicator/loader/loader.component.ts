import { Component, ChangeDetectionStrategy, Input, ChangeDetectorRef, OnInit } from '@angular/core';

@Component({
	selector: 'app-loader',
	templateUrl: './loader.component.html',
	styleUrls: ['./loader.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoaderComponent implements OnInit {
	@Input() text: string = '';
	@Input() type: number = 0;
	//0 - Small
	//1 - Large

	constructor(private cdr: ChangeDetectorRef) { }

	check(): void { //Always run check if changes in component need to be reflected on view.
		this.cdr.markForCheck();
	}

	ngOnInit(): void {
		this.check();
	}
}
