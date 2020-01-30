import { Component, TemplateRef, Input, ChangeDetectionStrategy, OnChanges, SimpleChanges } from '@angular/core';
import { EventModel } from './models/event.model';
import { DayModel } from './models/day.model';
import { HourModel } from './models/hour.model';

@Component({
  selector: 'pro-resource-calendar',
  template: `
<div class="header">
  <div class="hour-row info-block">
    <ng-template
      [ngTemplateOutlet]="infoTemplate || defaultInfoTemplate"
    ></ng-template>
  </div>
  <div class="day-row" *ngFor="let date of datesWithEvents">
    <ng-template
      [ngTemplateOutlet]="dayTemplate || defaultDayTemplate"
      [ngTemplateOutletContext]="{ day: date.data }"
    ></ng-template>
    <div class="resources">
      <div
        class="resource"
        [style.max-width.%]="100 / date.resources.length"
        *ngFor="let resource of date.resources"
      >
        <ng-template
          [ngTemplateOutlet]="resourceTemplate || defaultResourceTemplate"
          [ngTemplateOutletContext]="{ resource: resource.data }"
        ></ng-template>
      </div>
    </div>
  </div>
</div>
<div class="calendar">
  <div class="hour-row">
    <div *ngFor="let hour of hours">
      <div class="hour-slot">
        <div
          class="hour-sub-slot"
          [style.height.px]="height"
          *ngFor="let slot of hour.slots"
        >
          <ng-template
            [ngTemplateOutlet]="hourTemplate || defaultHourTemplate"
            [ngTemplateOutletContext]="{ slot: slot }"
          ></ng-template>
        </div>
      </div>
    </div>
  </div>
  <div *ngFor="let date of datesWithEvents" class="day-row resources">
    <ng-template
      [ngTemplateOutlet]="currentTimeTemplate || defaultCurrentTimeTemplate"
      [ngTemplateOutletContext]="{ day: date.data }"
    ></ng-template>
    <div
      class="resource"
      [style.max-width.%]="100 / date.resources.length"
      *ngFor="let resource of date.resources"
    >
      <div
        *ngFor="let event of resource.events"
        [style.top.px]="event.position"
        [style.height.px]="event.height"
        class="event"
      >
        <ng-template
          [ngTemplateOutlet]="eventTemplate || defaultEventTemplate"
          [ngTemplateOutletContext]="{ event: event.data, resource: resource.data, day: date.data }"
        ></ng-template>
      </div>

      <div class="hour-slot" *ngFor="let hour of resource.hours">
        <div
          class="hour-sub-slot"
          [style.height.px]="height"
          *ngFor="let slot of hour.slots"
        >
          <ng-template
            [ngTemplateOutlet]="slotTemplate || defaultSlotTemplate"
            [ngTemplateOutletContext]="{
              slot: slot,
              resource: resource.data,
              day: date.data
            }"
          ></ng-template>
        </div>
      </div>
    </div>
  </div>
</div>

<ng-template #defaultInfoTemplate></ng-template>
<ng-template #defaultDayTemplate let-day="day">{{ day.day | date: 'shortDate' }}</ng-template>
<ng-template #defaultResourceTemplate let-resource="resource">{{
  resource.resourceNumber
}}</ng-template>
<ng-template #defaultHourTemplate let-slot="slot">{{ slot.time | date: 'shortTime' }}</ng-template>
<ng-template #defaultCurrentTimeTemplate let-day="day"></ng-template>
<ng-template #defaultEventTemplate let-event="event">{{
  event.resourceNumber
}}</ng-template>
<ng-template #defaultSlotTemplate let-slot="slot">{{ slot.time | date: 'shortTime' }}</ng-template>
  `,
  styles: [`
.header {
  flex-direction: row;
  box-sizing: border-box;
  display: flex;
  place-content: stretch flex-start;
  align-items: stretch;
}

.calendar {
  flex-direction: row;
  box-sizing: border-box;
  display: flex;
  place-content: stretch flex-start;
  align-items: stretch;
}

.resources {
  flex-direction: row;
  box-sizing: border-box;
  display: flex;
  place-content: stretch flex-start;
  align-items: stretch;
}

.resource {
  flex: 1 1 100%;
  position: relative;
  box-sizing: border-box;
}

.hour-sub-slot {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.hour-row {
  width: 10%;
  min-width: 50px;
}

.day-row {
  position: relative;
  width: 90%;
}

.event {
  position: absolute;
  z-index: 1;
  width: 100%;
  overflow: hidden;
}
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResourceCalendarComponent implements OnChanges {
  /**
   * An array of dates to show on view.
   * NOTE: Hours are drawn from the arrays first day's first resource.
   */
  @Input() dates: DayModel[] = [];

  /**
   * An array of events to show on view.
   */
  @Input() events: EventModel[] = [];

  /**
   * How long is one slot duration in minutes.
   */
  @Input() slotDurationInMinutes = 15;

  /**
   * Height of one slot in pixels.
   */
  @Input() height = 60;

  /**
   * If every hour contains border or margin etc. This value needs to be that height in pixels.
   */
  @Input() hourBorderHeight = 1;

  /**
   * A custom template to use for the header empty space top of hours.
   */
  @Input() infoTemplate: TemplateRef<any>;

  /**
   * A custom template to use for day view in header.
   */
  @Input() dayTemplate: TemplateRef<any>;

  /**
   * A custom template to use for day view resource in header (below day template).
   */
  @Input() resourceTemplate: TemplateRef<any>;

  /**
   * A custom template to use for hour view (left to calendar).
   */
  @Input() hourTemplate: TemplateRef<any>;

  /**
   * A custom template to use for events.
   */
  @Input() eventTemplate: TemplateRef<any>;

  /**
   * A custom template to use for slots.
   */
  @Input() slotTemplate: TemplateRef<any>;

  /**
   * A custom template to show current time etc. custom overlay.
   */
  @Input() currentTimeTemplate: TemplateRef<any>;


  /**
   * Hours for the calendar
   */
  public hours: HourModel[] = [];

  /**
   * Dates with events in resources
   */
  public datesWithEvents: any[] = [];

  public ngOnChanges(changes: SimpleChanges) {
    if (changes.dates && changes.dates.currentValue) {
      const dates = changes.dates.currentValue;
      if (dates.length === 0) {
        this.hours = [];
      } else {
        this.hours = dates[0].resources[0].hours;
      }
      this.setResourceEvents();
    } else if (changes.events && changes.events.currentValue) {
      this.setResourceEvents();
    }
  }

  private setResourceEvents() {
    if (this.dates && this.dates.length > 0) {
      this.datesWithEvents = [];
      this.dates.forEach(d => {
        const resources = [];

        d.resources.forEach(r => {
          resources.push({
            data: r,
            hours: r.hours,
            events: this.getEvents(r.resourceNumber, r.hours[0].slots[0].time)
          });
        });

        this.datesWithEvents.push({
          data: d,
          resources
        });
      });
    }
  }

  /**
   * Gets events for a day's resource
   */
  private getEvents(
    resourceNumber: number | string,
    day: Date
  ): any[] {
    if (!this.events || this.events.length === 0) {
      return [];
    }

    const endDate = new Date(day);
    endDate.setDate(endDate.getDate() + 1);

    const dayStart = day.getTime();
    const dayEnd = endDate.getTime();

    const events = this.events.filter(
      m =>
        m.resourceNumber === resourceNumber &&
        m.startTime.getTime() >= dayStart &&
        m.endTime.getTime() < dayEnd
    );

    // Calculate postion and height for events
    return events.map(event => {
      return {
        data: event,
        position: this.calculatePosition(event, day),
        height: this.calculateHeight(event)
      };
    });
  }

  /**
   * Calculates events top position. Floors to closest minute.
   *
   * @param event Event
   */
  private calculatePosition(event: EventModel, day: Date): number {
    const diffInMinutes =
      (event.startTime.getTime() -
        day.getTime()) / 1000 / 60;

    return (
      Math.floor(diffInMinutes / this.slotDurationInMinutes) * this.height +
      Math.floor(diffInMinutes / 60) * this.hourBorderHeight
    );
  }

  /**
   * Calculates events height. Floors to nearest minute.
   *
   * @param event Event
   */
  private calculateHeight(event: EventModel): number {
    const diffInMinutes =
      (event.endTime.getTime() - event.startTime.getTime()) / 1000 / 60;

    if (diffInMinutes <= 0) {
      return 1 * this.height;
    }

    let hoursDiff = event.endTime.getHours() - event.startTime.getHours();

    // If end time ends with 0 minutes like 16:00, don't add hour diff as it ends in 15:xx - 16:00 slot
    if (event.endTime.getMinutes() === 0 && hoursDiff > 0) {
      hoursDiff--;
    }

    return (
      (diffInMinutes / this.slotDurationInMinutes) * this.height +
      hoursDiff * this.hourBorderHeight
    );
  }
}
