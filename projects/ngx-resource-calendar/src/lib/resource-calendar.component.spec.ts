import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourceCalendarComponent } from './resource-calendar.component';

describe('ResourceCalendarComponent', () => {
  let component: ResourceCalendarComponent;
  let fixture: ComponentFixture<ResourceCalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResourceCalendarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourceCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
