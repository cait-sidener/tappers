import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchivePicsComponent } from './archive-pics.component';

describe('ArchivePicsComponent', () => {
  let component: ArchivePicsComponent;
  let fixture: ComponentFixture<ArchivePicsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArchivePicsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchivePicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
