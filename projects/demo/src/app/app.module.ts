import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NgxResourceCalendarModule } from 'projects/ngx-resource-calendar/src/public-api';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgxResourceCalendarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
