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
import { InternalResourceModel } from './models/internal-resource.model';

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
  @Input() startHour: number | null = null;

  /**
   * Last hour to draw in the calendar.
   */
  @Input() endHour: number | null = null;

  /**
   * An array of events to show on view.
   */
  @Input() events: EventModel[] = [];

  /**
   * Duration (in minutes) of a calendar slot within an hour.
   * This value must be between 1 and 60 (inclusive) to ensure valid
   * slot breakdowns within an hour. A value of 30 defines slots
   * of 30 minutes each, while a value of 60 defines a single slot
   * spanning the entire hour. Choosing a value that is not a
   * divisor of 60 will result in leftover minutes that cannot be used for
   * complete slots.
   * @example
   *  60/30=2 ✔️
   *  60/15=4 ✔️
   *  60/45=1.3 ❌
   *  60/25=2.4 ❌
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
    // Rebuild slots for hours when the date list changes.
    if (changes.dates && changes.dates.currentValue) {
      const dates: DayModel[] = changes.dates.currentValue;
      this.hours = [];

      if (
        dates.length > 0 &&
        typeof this.startHour === 'number' &&
        typeof this.endHour === 'number'
      ) {
        // For each hour, we calculate possible slots based on the user specified duration.
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

  /**
   * Creates dates with events by combining resources to dates.
   * @private
   */
  private setResourceEvents(): void {
    if (!Array.isArray(this.dates) || this.dates.length === 0) {
      return;
    }

    this.datesWithEvents = this.dates.map((dayModel: DayModel): DateWithEventsModel => {
      const startTime: Date = this.createDate(dayModel.day, this.startHour, 0);
      const resources: InternalResourceModel[] = dayModel.resources.map((
        resourceModel: ResourceModel
      ): InternalResourceModel => ({
        resourceNumber: resourceModel.resourceNumber,
        data: resourceModel,
        slots: this.getSlots(resourceModel.slots, startTime),
        events: this.getEvents(resourceModel.resourceNumber, startTime),
      }));

      return {
        data: dayModel,
        resources,
      };
    });
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
    return events.map((event: EventModel): CalendarEventModel<EventModel> => ({
      data: event,
      position: this.calculatePosition(event, day),
      height: this.calculateHeight(event),
      left: event.left || '0',
      width: event.width || '100%',
    }));
  }

  /**
   * Gets slots for a day's resource
   */
  private getSlots(
    slots: SlotModel[] | CalendarEventModel<SlotModel>[],
    day: Date,
  ): CalendarEventModel<SlotModel>[] {
    if (!slots || slots.length === 0) {
      return [];
    }

    // Calculate position and height for slots
    return slots.map((
      slot: SlotModel | CalendarEventModel<SlotModel>
    ): CalendarEventModel<SlotModel> => {
      const plainSlot: SlotModel = this.instanceOfCalendarEventModel(slot) ? slot.data : slot;
      return {
        data: plainSlot,
        position: this.calculatePosition(plainSlot, day),
        height: this.calculateHeight(plainSlot),
        left: plainSlot.left || '0',
        width: plainSlot.width || '100%',
      };
    });
  }

  /**
   * Checks if the given slot is CalendarEventModel.
   * @private
   */
  private instanceOfCalendarEventModel(
    slot: SlotModel | CalendarEventModel<SlotModel>
  ): slot is CalendarEventModel<SlotModel> {
    const fieldName: keyof CalendarEventModel<SlotModel> = 'data';
    return fieldName in slot;
  }

  /**
   * Calculates events top position. Floors to the closest minute.
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
   * @param hours Time in hours (in local timezone)
   * @param minutes Time in minutes (in local timezone)
   * @returns Date time set time
   */
  private createDate(date: Date, hours: number, minutes: number): Date {
    const newDate: Date = new Date(date);
    newDate.setHours(hours);
    newDate.setMinutes(minutes);
    return newDate;
  }
}
