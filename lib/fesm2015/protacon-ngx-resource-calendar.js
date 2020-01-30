import { Component, ChangeDetectionStrategy, Input, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * @fileoverview added by tsickle
 * Generated from: lib/resource-calendar.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ResourceCalendarComponent {
    constructor() {
        /**
         * An array of dates to show on view.
         * NOTE: Hours are drawn from the arrays first day's first resource.
         */
        this.dates = [];
        /**
         * An array of events to show on view.
         */
        this.events = [];
        /**
         * How long is one slot duration in minutes.
         */
        this.slotDurationInMinutes = 15;
        /**
         * Height of one slot in pixels.
         */
        this.height = 60;
        /**
         * If every hour contains border or margin etc. This value needs to be that height in pixels.
         */
        this.hourBorderHeight = 1;
        /**
         * Hours for the calendar
         */
        this.hours = [];
        /**
         * Dates with events in resources
         */
        this.datesWithEvents = [];
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (changes.dates && changes.dates.currentValue) {
            /** @type {?} */
            const dates = changes.dates.currentValue;
            if (dates.length === 0) {
                this.hours = [];
            }
            else {
                this.hours = dates[0].resources[0].hours;
            }
            this.setResourceEvents();
        }
        else if (changes.events && changes.events.currentValue) {
            this.setResourceEvents();
        }
    }
    /**
     * @private
     * @return {?}
     */
    setResourceEvents() {
        if (this.dates && this.dates.length > 0) {
            this.datesWithEvents = [];
            this.dates.forEach((/**
             * @param {?} d
             * @return {?}
             */
            d => {
                /** @type {?} */
                const resources = [];
                d.resources.forEach((/**
                 * @param {?} r
                 * @return {?}
                 */
                r => {
                    resources.push({
                        data: r,
                        hours: r.hours,
                        events: this.getEvents(r.resourceNumber, r.hours[0].slots[0].time)
                    });
                }));
                this.datesWithEvents.push({
                    data: d,
                    resources
                });
            }));
        }
    }
    /**
     * Gets events for a day's resource
     * @private
     * @param {?} resourceNumber
     * @param {?} day
     * @return {?}
     */
    getEvents(resourceNumber, day) {
        if (!this.events || this.events.length === 0) {
            return [];
        }
        /** @type {?} */
        const endDate = new Date(day);
        endDate.setDate(endDate.getDate() + 1);
        /** @type {?} */
        const dayStart = day.getTime();
        /** @type {?} */
        const dayEnd = endDate.getTime();
        /** @type {?} */
        const events = this.events.filter((/**
         * @param {?} m
         * @return {?}
         */
        m => m.resourceNumber === resourceNumber &&
            m.startTime.getTime() >= dayStart &&
            m.endTime.getTime() < dayEnd));
        // Calculate postion and height for events
        return events.map((/**
         * @param {?} event
         * @return {?}
         */
        event => {
            return {
                data: event,
                position: this.calculatePosition(event, day),
                height: this.calculateHeight(event)
            };
        }));
    }
    /**
     * Calculates events top position. Floors to closest minute.
     *
     * @private
     * @param {?} event Event
     * @param {?} day
     * @return {?}
     */
    calculatePosition(event, day) {
        /** @type {?} */
        const diffInMinutes = (event.startTime.getTime() -
            day.getTime()) / 1000 / 60;
        return (Math.floor(diffInMinutes / this.slotDurationInMinutes) * this.height +
            Math.floor(diffInMinutes / 60) * this.hourBorderHeight);
    }
    /**
     * Calculates events height. Floors to nearest minute.
     *
     * @private
     * @param {?} event Event
     * @return {?}
     */
    calculateHeight(event) {
        /** @type {?} */
        const diffInMinutes = (event.endTime.getTime() - event.startTime.getTime()) / 1000 / 60;
        if (diffInMinutes <= 0) {
            return 1 * this.height;
        }
        /** @type {?} */
        let hoursDiff = event.endTime.getHours() - event.startTime.getHours();
        // If end time ends with 0 minutes like 16:00, don't add hour diff as it ends in 15:xx - 16:00 slot
        if (event.endTime.getMinutes() === 0 && hoursDiff > 0) {
            hoursDiff--;
        }
        return ((diffInMinutes / this.slotDurationInMinutes) * this.height +
            hoursDiff * this.hourBorderHeight);
    }
}
ResourceCalendarComponent.decorators = [
    { type: Component, args: [{
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
                changeDetection: ChangeDetectionStrategy.OnPush,
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
  `]
            }] }
];
ResourceCalendarComponent.propDecorators = {
    dates: [{ type: Input }],
    events: [{ type: Input }],
    slotDurationInMinutes: [{ type: Input }],
    height: [{ type: Input }],
    hourBorderHeight: [{ type: Input }],
    infoTemplate: [{ type: Input }],
    dayTemplate: [{ type: Input }],
    resourceTemplate: [{ type: Input }],
    hourTemplate: [{ type: Input }],
    eventTemplate: [{ type: Input }],
    slotTemplate: [{ type: Input }],
    currentTimeTemplate: [{ type: Input }]
};
if (false) {
    /**
     * An array of dates to show on view.
     * NOTE: Hours are drawn from the arrays first day's first resource.
     * @type {?}
     */
    ResourceCalendarComponent.prototype.dates;
    /**
     * An array of events to show on view.
     * @type {?}
     */
    ResourceCalendarComponent.prototype.events;
    /**
     * How long is one slot duration in minutes.
     * @type {?}
     */
    ResourceCalendarComponent.prototype.slotDurationInMinutes;
    /**
     * Height of one slot in pixels.
     * @type {?}
     */
    ResourceCalendarComponent.prototype.height;
    /**
     * If every hour contains border or margin etc. This value needs to be that height in pixels.
     * @type {?}
     */
    ResourceCalendarComponent.prototype.hourBorderHeight;
    /**
     * A custom template to use for the header empty space top of hours.
     * @type {?}
     */
    ResourceCalendarComponent.prototype.infoTemplate;
    /**
     * A custom template to use for day view in header.
     * @type {?}
     */
    ResourceCalendarComponent.prototype.dayTemplate;
    /**
     * A custom template to use for day view resource in header (below day template).
     * @type {?}
     */
    ResourceCalendarComponent.prototype.resourceTemplate;
    /**
     * A custom template to use for hour view (left to calendar).
     * @type {?}
     */
    ResourceCalendarComponent.prototype.hourTemplate;
    /**
     * A custom template to use for events.
     * @type {?}
     */
    ResourceCalendarComponent.prototype.eventTemplate;
    /**
     * A custom template to use for slots.
     * @type {?}
     */
    ResourceCalendarComponent.prototype.slotTemplate;
    /**
     * A custom template to show current time etc. custom overlay.
     * @type {?}
     */
    ResourceCalendarComponent.prototype.currentTimeTemplate;
    /**
     * Hours for the calendar
     * @type {?}
     */
    ResourceCalendarComponent.prototype.hours;
    /**
     * Dates with events in resources
     * @type {?}
     */
    ResourceCalendarComponent.prototype.datesWithEvents;
}

/**
 * @fileoverview added by tsickle
 * Generated from: lib/ngx-resource-calendar.module.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class NgxResourceCalendarModule {
}
NgxResourceCalendarModule.decorators = [
    { type: NgModule, args: [{
                declarations: [ResourceCalendarComponent],
                imports: [
                    CommonModule
                ],
                exports: [ResourceCalendarComponent]
            },] }
];

/**
 * @fileoverview added by tsickle
 * Generated from: lib/models/day.model.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class DayModel {
}
if (false) {
    /** @type {?} */
    DayModel.prototype.day;
    /** @type {?} */
    DayModel.prototype.resources;
}

/**
 * @fileoverview added by tsickle
 * Generated from: lib/models/event.model.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class EventModel {
}
if (false) {
    /** @type {?} */
    EventModel.prototype.startTime;
    /** @type {?} */
    EventModel.prototype.endTime;
    /** @type {?} */
    EventModel.prototype.resourceNumber;
}

/**
 * @fileoverview added by tsickle
 * Generated from: lib/models/hour.model.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class HourModel {
}
if (false) {
    /** @type {?} */
    HourModel.prototype.slots;
}

/**
 * @fileoverview added by tsickle
 * Generated from: lib/models/resource.model.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ResourceModel {
}
if (false) {
    /** @type {?} */
    ResourceModel.prototype.resourceNumber;
    /** @type {?} */
    ResourceModel.prototype.hours;
}

/**
 * @fileoverview added by tsickle
 * Generated from: lib/models/slot.model.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class SlotModel {
}
if (false) {
    /** @type {?} */
    SlotModel.prototype.time;
}

/**
 * @fileoverview added by tsickle
 * Generated from: public-api.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * Generated from: protacon-ngx-resource-calendar.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { DayModel, EventModel, HourModel, NgxResourceCalendarModule, ResourceCalendarComponent, ResourceModel, SlotModel };
//# sourceMappingURL=protacon-ngx-resource-calendar.js.map
