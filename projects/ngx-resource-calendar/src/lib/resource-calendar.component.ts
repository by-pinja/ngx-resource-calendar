import {
  Component,
  TemplateRef,
  Input,
  ChangeDetectionStrategy,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { EventModel } from './models/event.model';
import { DayModel } from './models/day.model';
import { HourModel } from './models/hour.model';
import { SlotModel } from './models/slot.model';
import { CalendarEventModel } from './models/calendar-event.model';
import { ResourceModel } from './models/resource.model';
import { DateWithEventsModel } from './models/date-with-resources.model';

@Component({
  selector: 'pinja-resource-calendar',
  templateUrl: 'resource-calendar.component.html',
  styleUrl: 'resource-calendar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResourceCalendarComponent implements OnChanges {
  /**
   * An array of dates to show on view.
   */
  @Input() dates: DayModel[] = [];

  /**
   * First hour to draw in the calendar.
   */
  @Input() startHour: number = null;

  /**
   * Last hour to draw in the calendar.
   */
  @Input() endHour: number = null;

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
  public datesWithEvents: DateWithEventsModel[] = [];

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.dates && changes.dates.currentValue) {
      const dates: DayModel[] = changes.dates.currentValue;
      if (
        dates.length === 0 ||
        this.startHour === null ||
        this.endHour === null
      ) {
        this.hours = [];
      } else {
        this.hours = [];
        for (let hour = this.startHour; hour <= this.endHour; hour++) {
          const slots: Date[] = [];
          for (
            let hourSlot = 0;
            hourSlot < 60;
            hourSlot += this.slotDurationInMinutes
          ) {
            slots.push(this.createDate(dates[0].day, hour, hourSlot));
          }
          this.hours.push({ slots });
        }
      }

      this.setResourceEvents();
    } else if (changes.events && changes.events.currentValue) {
      this.setResourceEvents();
    }
  }

  private setResourceEvents(): void {
    if (this.dates && this.dates.length > 0) {
      this.datesWithEvents = [];
      this.dates.forEach((d: DayModel): void => {
        const resources: ResourceModel[] = [];
        const startTime: Date = this.createDate(d.day, this.startHour, 0);

        d.resources.forEach((r: ResourceModel): void => {
          resources.push({
            data: r,
            slots: this.getSlots(r.slots, startTime),
            events: this.getEvents(r.resourceNumber, startTime),
          });
        });

        this.datesWithEvents.push({
          data: d,
          resources,
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
  ): CalendarEventModel<EventModel>[] {
    if (!this.events || this.events.length === 0) {
      return [];
    }

    const endDate: Date = new Date(day);
    endDate.setDate(endDate.getDate() + 1);

    const dayStart: number = day.getTime();
    const dayEnd: number = endDate.getTime();

    const events: EventModel[] = this.events.filter(
      (m: EventModel) =>
        m.resourceNumber === resourceNumber &&
        m.startTime.getTime() >= dayStart &&
        m.endTime.getTime() < dayEnd
    );

    // Calculate position and height for events
    return events.map((event: EventModel): CalendarEventModel<EventModel> => {
      return {
        data: event,
        position: this.calculatePosition(event, day),
        height: this.calculateHeight(event),
        left: event.left || '0',
        width: event.width || '100%',
      };
    });
  }

  /**
   * Gets slots for a day's resource
   */
  private getSlots(
    slots: SlotModel[],
    day: Date
  ): CalendarEventModel<SlotModel>[] {
    if (!slots || slots.length === 0) {
      return [];
    }

    // Calculate position and height for slots
    return slots.map((slot: SlotModel): CalendarEventModel<SlotModel> => {
      return {
        data: slot,
        position: this.calculatePosition(slot, day),
        height: this.calculateHeight(slot),
        left: slot.left || '0',
        width: slot.width || '100%',
      };
    });
  }

  /**
   * Calculates events top position. Floors to closest minute.
   */
  private calculatePosition(event: EventModel | SlotModel, day: Date): number {
    const diffInMinutes: number =
      (event.startTime.getTime() - day.getTime()) / 1000 / 60;

    return Math.floor(
      (diffInMinutes / this.slotDurationInMinutes) * this.height
    );
  }

  /**
   * Calculates events height. Floors to nearest minute.
   *
   * @param event Event
   */
  private calculateHeight(event: EventModel | SlotModel): number {
    const diffInMinutes: number =
      (event.endTime.getTime() - event.startTime.getTime()) / 1000 / 60;

    if (diffInMinutes <= 0) {
      return this.height;
    }

    return (diffInMinutes / this.slotDurationInMinutes) * this.height;
  }

  /**
   * Creates a new date from given date, hour and minutes.
   *
   * @param date Date time
   * @param hours Time in hours
   * @param minutes Time in minutes
   * @returns Date time set time
   */
  private createDate(date: Date, hours: number, minutes: number): Date {
    const newDate: Date = new Date(date);
    newDate.setHours(hours);
    newDate.setMinutes(minutes);
    return newDate;
  }
}
