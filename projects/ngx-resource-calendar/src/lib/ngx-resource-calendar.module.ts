import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResourceCalendarComponent } from './resource-calendar.component';

@NgModule({
  declarations: [ResourceCalendarComponent],
  imports: [
    CommonModule
  ],
  exports: [ResourceCalendarComponent]
})
export class NgxResourceCalendarModule { }
