import { TemplateRef, OnChanges, SimpleChanges } from '@angular/core';
import { EventModel } from './models/event.model';
import { DayModel } from './models/day.model';
import { HourModel } from './models/hour.model';
export declare class ResourceCalendarComponent implements OnChanges {
    /**
     * An array of dates to show on view.
     * NOTE: Hours are drawn from the arrays first day's first resource.
     */
    dates: DayModel[];
    /**
     * An array of events to show on view.
     */
    events: EventModel[];
    /**
     * How long is one slot duration in minutes.
     */
    slotDurationInMinutes: number;
    /**
     * Height of one slot in pixels.
     */
    height: number;
    /**
     * If every hour contains border or margin etc. This value needs to be that height in pixels.
     */
    hourBorderHeight: number;
    /**
     * A custom template to use for the header empty space top of hours.
     */
    infoTemplate: TemplateRef<any>;
    /**
     * A custom template to use for day view in header.
     */
    dayTemplate: TemplateRef<any>;
    /**
     * A custom template to use for day view resource in header (below day template).
     */
    resourceTemplate: TemplateRef<any>;
    /**
     * A custom template to use for hour view (left to calendar).
     */
    hourTemplate: TemplateRef<any>;
    /**
     * A custom template to use for events.
     */
    eventTemplate: TemplateRef<any>;
    /**
     * A custom template to use for slots.
     */
    slotTemplate: TemplateRef<any>;
    /**
     * A custom template to show current time etc. custom overlay.
     */
    currentTimeTemplate: TemplateRef<any>;
    /**
     * Hours for the calendar
     */
    hours: HourModel[];
    /**
     * Dates with events in resources
     */
    datesWithEvents: any[];
    ngOnChanges(changes: SimpleChanges): void;
    private setResourceEvents;
    /**
     * Gets events for a day's resource
     */
    private getEvents;
    /**
     * Calculates events top position. Floors to closest minute.
     *
     * @param event Event
     */
    private calculatePosition;
    /**
     * Calculates events height. Floors to nearest minute.
     *
     * @param event Event
     */
    private calculateHeight;
}
