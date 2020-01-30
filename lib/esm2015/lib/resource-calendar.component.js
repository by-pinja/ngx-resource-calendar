/**
 * @fileoverview added by tsickle
 * Generated from: lib/resource-calendar.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, TemplateRef, Input, ChangeDetectionStrategy } from '@angular/core';
export class ResourceCalendarComponent {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzb3VyY2UtY2FsZW5kYXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHByb3RhY29uL25neC1yZXNvdXJjZS1jYWxlbmRhci8iLCJzb3VyY2VzIjpbImxpYi9yZXNvdXJjZS1jYWxlbmRhci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUUsdUJBQXVCLEVBQTRCLE1BQU0sZUFBZSxDQUFDO0FBZ0tqSCxNQUFNLE9BQU8seUJBQXlCO0lBM0p0Qzs7Ozs7UUFnS1csVUFBSyxHQUFlLEVBQUUsQ0FBQzs7OztRQUt2QixXQUFNLEdBQWlCLEVBQUUsQ0FBQzs7OztRQUsxQiwwQkFBcUIsR0FBRyxFQUFFLENBQUM7Ozs7UUFLM0IsV0FBTSxHQUFHLEVBQUUsQ0FBQzs7OztRQUtaLHFCQUFnQixHQUFHLENBQUMsQ0FBQzs7OztRQXlDdkIsVUFBSyxHQUFnQixFQUFFLENBQUM7Ozs7UUFLeEIsb0JBQWUsR0FBVSxFQUFFLENBQUM7SUFpSHJDLENBQUM7Ozs7O0lBL0dRLFdBQVcsQ0FBQyxPQUFzQjtRQUN2QyxJQUFJLE9BQU8sQ0FBQyxLQUFLLElBQUksT0FBTyxDQUFDLEtBQUssQ0FBQyxZQUFZLEVBQUU7O2tCQUN6QyxLQUFLLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxZQUFZO1lBQ3hDLElBQUksS0FBSyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7Z0JBQ3RCLElBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO2FBQ2pCO2lCQUFNO2dCQUNMLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7YUFDMUM7WUFDRCxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztTQUMxQjthQUFNLElBQUksT0FBTyxDQUFDLE1BQU0sSUFBSSxPQUFPLENBQUMs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Szs7Ozs7Ozs7SUF2RE4sMENBQWdDOzs7OztJQUtoQywyQ0FBbUM7Ozs7O0lBS25DLDBEQUFvQzs7Ozs7SUFLcEMsMkNBQXFCOzs7OztJQUtyQixxREFBOEI7Ozs7O0lBSzlCLGlEQUF3Qzs7Ozs7SUFLeEMsZ0RBQXVDOzs7OztJQUt2QyxxREFBNEM7Ozs7O0lBSzVDLGlEQUF3Qzs7Ozs7SUFLeEMsa0RBQXlDOzs7OztJQUt6QyxpREFBd0M7Ozs7O0lBS3hDLHdEQUErQzs7Ozs7SUFNL0MsMENBQStCOzs7OztJQUsvQixvREFBbUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIFRlbXBsYXRlUmVmLCBJbnB1dCwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIE9uQ2hhbmdlcywgU2ltcGxlQ2hhbmdlcyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRXZlbnRNb2RlbCB9IGZyb20gJy4vbW9kZWxzL2V2ZW50Lm1vZGVsJztcbmltcG9ydCB7IERheU1vZGVsIH0gZnJvbSAnLi9tb2RlbHMvZGF5Lm1vZGVsJztcbmltcG9ydCB7IEhvdXJNb2RlbCB9IGZyb20gJy4vbW9kZWxzL2hvdXIubW9kZWwnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdwcm8tcmVzb3VyY2UtY2FsZW5kYXInLFxuICB0ZW1wbGF0ZTogYFxuPGRpdiBjbGFzcz1cImhlYWRlclwiPlxuICA8ZGl2IGNsYXNzPVwiaG91ci1yb3cgaW5mby1ibG9ja1wiPlxuICAgIDxuZy10ZW1wbGF0ZVxuICAgICAgW25nVGVtcGxhdGVPdXRsZXRdPVwiaW5mb1RlbXBsYXRlIHx8IGRlZmF1bHRJbmZvVGVtcGxhdGVcIlxuICAgID48L25nLXRlbXBsYXRlPlxuICA8L2Rpdj5cbiAgPGRpdiBjbGFzcz1cImRheS1yb3dcIiAqbmdGb3I9XCJsZXQgZGF0ZSBvZiBkYXRlc1dpdGhFdmVudHNcIj5cbiAgICA8bmctdGVtcGxhdGVcbiAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0XT1cImRheVRlbXBsYXRlIHx8IGRlZmF1bHREYXlUZW1wbGF0ZVwiXG4gICAgICBbbmdUZW1wbGF0ZU91dGxldENvbnRleHRdPVwieyBkYXk6IGRhdGUuZGF0YSB9XCJcbiAgICA+PC9uZy10ZW1wbGF0ZT5cbiAgICA8ZGl2IGNsYXNzPVwicmVzb3VyY2VzXCI+XG4gICAgICA8ZGl2XG4gICAgICAgIGNsYXNzPVwicmVzb3VyY2VcIlxuICAgICAgICBbc3R5bGUubWF4LXdpZHRoLiVdPVwiMTAwIC8gZGF0ZS5yZXNvdXJjZXMubGVuZ3RoXCJcbiAgICAgICAgKm5nRm9yPVwibGV0IHJlc291cmNlIG9mIGRhdGUucmVzb3VyY2VzXCJcbiAgICAgID5cbiAgICAgICAgPG5nLXRlbXBsYXRlXG4gICAgICAgICAgW25nVGVtcGxhdGVPdXRsZXRdPVwicmVzb3VyY2VUZW1wbGF0ZSB8fCBkZWZhdWx0UmVzb3VyY2VUZW1wbGF0ZVwiXG4gICAgICAgICAgW25nVGVtcGxhdGVPdXRsZXRDb250ZXh0XT1cInsgcmVzb3VyY2U6IHJlc291cmNlLmRhdGEgfVwiXG4gICAgICAgID48L25nLXRlbXBsYXRlPlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuPC9kaXY+XG48ZGl2IGNsYXNzPVwiY2FsZW5kYXJcIj5cbiAgPGRpdiBjbGFzcz1cImhvdXItcm93XCI+XG4gICAgPGRpdiAqbmdGb3I9XCJsZXQgaG91ciBvZiBob3Vyc1wiPlxuICAgICAgPGRpdiBjbGFzcz1cImhvdXItc2xvdFwiPlxuICAgICAgICA8ZGl2XG4gICAgICAgICAgY2xhc3M9XCJob3VyLXN1Yi1zbG90XCJcbiAgICAgICAgICBbc3R5bGUuaGVpZ2h0LnB4XT1cImhlaWdodFwiXG4gICAgICAgICAgKm5nRm9yPVwibGV0IHNsb3Qgb2YgaG91ci5zbG90c1wiXG4gICAgICAgID5cbiAgICAgICAgICA8bmctdGVtcGxhdGVcbiAgICAgICAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0XT1cImhvdXJUZW1wbGF0ZSB8fCBkZWZhdWx0SG91clRlbXBsYXRlXCJcbiAgICAgICAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0Q29udGV4dF09XCJ7IHNsb3Q6IHNsb3QgfVwiXG4gICAgICAgICAgPjwvbmctdGVtcGxhdGU+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuICA8ZGl2ICpuZ0Zvcj1cImxldCBkYXRlIG9mIGRhdGVzV2l0aEV2ZW50c1wiIGNsYXNzPVwiZGF5LXJvdyByZXNvdXJjZXNcIj5cbiAgICA8bmctdGVtcGxhdGVcbiAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0XT1cImN1cnJlbnRUaW1lVGVtcGxhdGUgfHwgZGVmYXVsdEN1cnJlbnRUaW1lVGVtcGxhdGVcIlxuICAgICAgW25nVGVtcGxhdGVPdXRsZXRDb250ZXh0XT1cInsgZGF5OiBkYXRlLmRhdGEgfVwiXG4gICAgPjwvbmctdGVtcGxhdGU+XG4gICAgPGRpdlxuICAgICAgY2xhc3M9XCJyZXNvdXJjZVwiXG4gICAgICBbc3R5bGUubWF4LXdpZHRoLiVdPVwiMTAwIC8gZGF0ZS5yZXNvdXJjZXMubGVuZ3RoXCJcbiAgICAgICpuZ0Zvcj1cImxldCByZXNvdXJjZSBvZiBkYXRlLnJlc291cmNlc1wiXG4gICAgPlxuICAgICAgPGRpdlxuICAgICAgICAqbmdGb3I9XCJsZXQgZXZlbnQgb2YgcmVzb3VyY2UuZXZlbnRzXCJcbiAgICAgICAgW3N0eWxlLnRvcC5weF09XCJldmVudC5wb3NpdGlvblwiXG4gICAgICAgIFtzdHlsZS5oZWlnaHQucHhdPVwiZXZlbnQuaGVpZ2h0XCJcbiAgICAgICAgY2xhc3M9XCJldmVudFwiXG4gICAgICA+XG4gICAgICAgIDxuZy10ZW1wbGF0ZVxuICAgICAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0XT1cImV2ZW50VGVtcGxhdGUgfHwgZGVmYXVsdEV2ZW50VGVtcGxhdGVcIlxuICAgICAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0Q29udGV4dF09XCJ7IGV2ZW50OiBldmVudC5kYXRhLCByZXNvdXJjZTogcmVzb3VyY2UuZGF0YSwgZGF5OiBkYXRlLmRhdGEgfVwiXG4gICAgICAgID48L25nLXRlbXBsYXRlPlxuICAgICAgPC9kaXY+XG5cbiAgICAgIDxkaXYgY2xhc3M9XCJob3VyLXNsb3RcIiAqbmdGb3I9XCJsZXQgaG91ciBvZiByZXNvdXJjZS5ob3Vyc1wiPlxuICAgICAgICA8ZGl2XG4gICAgICAgICAgY2xhc3M9XCJob3VyLXN1Yi1zbG90XCJcbiAgICAgICAgICBbc3R5bGUuaGVpZ2h0LnB4XT1cImhlaWdodFwiXG4gICAgICAgICAgKm5nRm9yPVwibGV0IHNsb3Qgb2YgaG91ci5zbG90c1wiXG4gICAgICAgID5cbiAgICAgICAgICA8bmctdGVtcGxhdGVcbiAgICAgICAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0XT1cInNsb3RUZW1wbGF0ZSB8fCBkZWZhdWx0U2xvdFRlbXBsYXRlXCJcbiAgICAgICAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0Q29udGV4dF09XCJ7XG4gICAgICAgICAgICAgIHNsb3Q6IHNsb3QsXG4gICAgICAgICAgICAgIHJlc291cmNlOiByZXNvdXJjZS5kYXRhLFxuICAgICAgICAgICAgICBkYXk6IGRhdGUuZGF0YVxuICAgICAgICAgICAgfVwiXG4gICAgICAgICAgPjwvbmctdGVtcGxhdGU+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuPC9kaXY+XG5cbjxuZy10ZW1wbGF0ZSAjZGVmYXVsdEluZm9UZW1wbGF0ZT48L25nLXRlbXBsYXRlPlxuPG5nLXRlbXBsYXRlICNkZWZhdWx0RGF5VGVtcGxhdGUgbGV0LWRheT1cImRheVwiPnt7IGRheS5kYXkgfCBkYXRlOiAnc2hvcnREYXRlJyB9fTwvbmctdGVtcGxhdGU+XG48bmctdGVtcGxhdGUgI2RlZmF1bHRSZXNvdXJjZVRlbXBsYXRlIGxldC1yZXNvdXJjZT1cInJlc291cmNlXCI+e3tcbiAgcmVzb3VyY2UucmVzb3VyY2VOdW1iZXJcbn19PC9uZy10ZW1wbGF0ZT5cbjxuZy10ZW1wbGF0ZSAjZGVmYXVsdEhvdXJUZW1wbGF0ZSBsZXQtc2xvdD1cInNsb3RcIj57eyBzbG90LnRpbWUgfCBkYXRlOiAnc2hvcnRUaW1lJyB9fTwvbmctdGVtcGxhdGU+XG48bmctdGVtcGxhdGUgI2RlZmF1bHRDdXJyZW50VGltZVRlbXBsYXRlIGxldC1kYXk9XCJkYXlcIj48L25nLXRlbXBsYXRlPlxuPG5nLXRlbXBsYXRlICNkZWZhdWx0RXZlbnRUZW1wbGF0ZSBsZXQtZXZlbnQ9XCJldmVudFwiPnt7XG4gIGV2ZW50LnJlc291cmNlTnVtYmVyXG59fTwvbmctdGVtcGxhdGU+XG48bmctdGVtcGxhdGUgI2RlZmF1bHRTbG90VGVtcGxhdGUgbGV0LXNsb3Q9XCJzbG90XCI+e3sgc2xvdC50aW1lIHwgZGF0ZTogJ3Nob3J0VGltZScgfX08L25nLXRlbXBsYXRlPlxuICBgLFxuICBzdHlsZXM6IFtgXG4uaGVhZGVyIHtcbiAgZmxleC1kaXJlY3Rpb246IHJvdztcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgZGlzcGxheTogZmxleDtcbiAgcGxhY2UtY29udGVudDogc3RyZXRjaCBmbGV4LXN0YXJ0O1xuICBhbGlnbi1pdGVtczogc3RyZXRjaDtcbn1cblxuLmNhbGVuZGFyIHtcbiAgZmxleC1kaXJlY3Rpb246IHJvdztcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgZGlzcGxheTogZmxleDtcbiAgcGxhY2UtY29udGVudDogc3RyZXRjaCBmbGV4LXN0YXJ0O1xuICBhbGlnbi1pdGVtczogc3RyZXRjaDtcbn1cblxuLnJlc291cmNlcyB7XG4gIGZsZXgtZGlyZWN0aW9uOiByb3c7XG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIHBsYWNlLWNvbnRlbnQ6IHN0cmV0Y2ggZmxleC1zdGFydDtcbiAgYWxpZ24taXRlbXM6IHN0cmV0Y2g7XG59XG5cbi5yZXNvdXJjZSB7XG4gIGZsZXg6IDEgMSAxMDAlO1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG59XG5cbi5ob3VyLXN1Yi1zbG90IHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAganVzdGlmeS1jb250ZW50OiBmbGV4LWVuZDtcbn1cblxuLmhvdXItcm93IHtcbiAgd2lkdGg6IDEwJTtcbiAgbWluLXdpZHRoOiA1MHB4O1xufVxuXG4uZGF5LXJvdyB7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgd2lkdGg6IDkwJTtcbn1cblxuLmV2ZW50IHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB6LWluZGV4OiAxO1xuICB3aWR0aDogMTAwJTtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbn1cbiAgYF0sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIFJlc291cmNlQ2FsZW5kYXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMge1xuICAvKipcbiAgICogQW4gYXJyYXkgb2YgZGF0ZXMgdG8gc2hvdyBvbiB2aWV3LlxuICAgKiBOT1RFOiBIb3VycyBhcmUgZHJhd24gZnJvbSB0aGUgYXJyYXlzIGZpcnN0IGRheSdzIGZpcnN0IHJlc291cmNlLlxuICAgKi9cbiAgQElucHV0KCkgZGF0ZXM6IERheU1vZGVsW10gPSBbXTtcblxuICAvKipcbiAgICogQW4gYXJyYXkgb2YgZXZlbnRzIHRvIHNob3cgb24gdmlldy5cbiAgICovXG4gIEBJbnB1dCgpIGV2ZW50czogRXZlbnRNb2RlbFtdID0gW107XG5cbiAgLyoqXG4gICAqIEhvdyBsb25nIGlzIG9uZSBzbG90IGR1cmF0aW9uIGluIG1pbnV0ZXMuXG4gICAqL1xuICBASW5wdXQoKSBzbG90RHVyYXRpb25Jbk1pbnV0ZXMgPSAxNTtcblxuICAvKipcbiAgICogSGVpZ2h0IG9mIG9uZSBzbG90IGluIHBpeGVscy5cbiAgICovXG4gIEBJbnB1dCgpIGhlaWdodCA9IDYwO1xuXG4gIC8qKlxuICAgKiBJZiBldmVyeSBob3VyIGNvbnRhaW5zIGJvcmRlciBvciBtYXJnaW4gZXRjLiBUaGlzIHZhbHVlIG5lZWRzIHRvIGJlIHRoYXQgaGVpZ2h0IGluIHBpeGVscy5cbiAgICovXG4gIEBJbnB1dCgpIGhvdXJCb3JkZXJIZWlnaHQgPSAxO1xuXG4gIC8qKlxuICAgKiBBIGN1c3RvbSB0ZW1wbGF0ZSB0byB1c2UgZm9yIHRoZSBoZWFkZXIgZW1wdHkgc3BhY2UgdG9wIG9mIGhvdXJzLlxuICAgKi9cbiAgQElucHV0KCkgaW5mb1RlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gIC8qKlxuICAgKiBBIGN1c3RvbSB0ZW1wbGF0ZSB0byB1c2UgZm9yIGRheSB2aWV3IGluIGhlYWRlci5cbiAgICovXG4gIEBJbnB1dCgpIGRheVRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gIC8qKlxuICAgKiBBIGN1c3RvbSB0ZW1wbGF0ZSB0byB1c2UgZm9yIGRheSB2aWV3IHJlc291cmNlIGluIGhlYWRlciAoYmVsb3cgZGF5IHRlbXBsYXRlKS5cbiAgICovXG4gIEBJbnB1dCgpIHJlc291cmNlVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgLyoqXG4gICAqIEEgY3VzdG9tIHRlbXBsYXRlIHRvIHVzZSBmb3IgaG91ciB2aWV3IChsZWZ0IHRvIGNhbGVuZGFyKS5cbiAgICovXG4gIEBJbnB1dCgpIGhvdXJUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcblxuICAvKipcbiAgICogQSBjdXN0b20gdGVtcGxhdGUgdG8gdXNlIGZvciBldmVudHMuXG4gICAqL1xuICBASW5wdXQoKSBldmVudFRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gIC8qKlxuICAgKiBBIGN1c3RvbSB0ZW1wbGF0ZSB0byB1c2UgZm9yIHNsb3RzLlxuICAgKi9cbiAgQElucHV0KCkgc2xvdFRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gIC8qKlxuICAgKiBBIGN1c3RvbSB0ZW1wbGF0ZSB0byBzaG93IGN1cnJlbnQgdGltZSBldGMuIGN1c3RvbSBvdmVybGF5LlxuICAgKi9cbiAgQElucHV0KCkgY3VycmVudFRpbWVUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcblxuXG4gIC8qKlxuICAgKiBIb3VycyBmb3IgdGhlIGNhbGVuZGFyXG4gICAqL1xuICBwdWJsaWMgaG91cnM6IEhvdXJNb2RlbFtdID0gW107XG5cbiAgLyoqXG4gICAqIERhdGVzIHdpdGggZXZlbnRzIGluIHJlc291cmNlc1xuICAgKi9cbiAgcHVibGljIGRhdGVzV2l0aEV2ZW50czogYW55W10gPSBbXTtcblxuICBwdWJsaWMgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgIGlmIChjaGFuZ2VzLmRhdGVzICYmIGNoYW5nZXMuZGF0ZXMuY3VycmVudFZhbHVlKSB7XG4gICAgICBjb25zdCBkYXRlcyA9IGNoYW5nZXMuZGF0ZXMuY3VycmVudFZhbHVlO1xuICAgICAgaWYgKGRhdGVzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICB0aGlzLmhvdXJzID0gW107XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmhvdXJzID0gZGF0ZXNbMF0ucmVzb3VyY2VzWzBdLmhvdXJzO1xuICAgICAgfVxuICAgICAgdGhpcy5zZXRSZXNvdXJjZUV2ZW50cygpO1xuICAgIH0gZWxzZSBpZiAoY2hhbmdlcy5ldmVudHMgJiYgY2hhbmdlcy5ldmVudHMuY3VycmVudFZhbHVlKSB7XG4gICAgICB0aGlzLnNldFJlc291cmNlRXZlbnRzKCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBzZXRSZXNvdXJjZUV2ZW50cygpIHtcbiAgICBpZiAodGhpcy5kYXRlcyAmJiB0aGlzLmRhdGVzLmxlbmd0aCA+IDApIHtcbiAgICAgIHRoaXMuZGF0ZXNXaXRoRXZlbnRzID0gW107XG4gICAgICB0aGlzLmRhdGVzLmZvckVhY2goZCA9PiB7XG4gICAgICAgIGNvbnN0IHJlc291cmNlcyA9IFtdO1xuXG4gICAgICAgIGQucmVzb3VyY2VzLmZvckVhY2gociA9PiB7XG4gICAgICAgICAgcmVzb3VyY2VzLnB1c2goe1xuICAgICAgICAgICAgZGF0YTogcixcbiAgICAgICAgICAgIGhvdXJzOiByLmhvdXJzLFxuICAgICAgICAgICAgZXZlbnRzOiB0aGlzLmdldEV2ZW50cyhyLnJlc291cmNlTnVtYmVyLCByLmhvdXJzWzBdLnNsb3RzWzBdLnRpbWUpXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuZGF0ZXNXaXRoRXZlbnRzLnB1c2goe1xuICAgICAgICAgIGRhdGE6IGQsXG4gICAgICAgICAgcmVzb3VyY2VzXG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgZXZlbnRzIGZvciBhIGRheSdzIHJlc291cmNlXG4gICAqL1xuICBwcml2YXRlIGdldEV2ZW50cyhcbiAgICByZXNvdXJjZU51bWJlcjogbnVtYmVyIHwgc3RyaW5nLFxuICAgIGRheTogRGF0ZVxuICApOiBhbnlbXSB7XG4gICAgaWYgKCF0aGlzLmV2ZW50cyB8fCB0aGlzLmV2ZW50cy5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybiBbXTtcbiAgICB9XG5cbiAgICBjb25zdCBlbmREYXRlID0gbmV3IERhdGUoZGF5KTtcbiAgICBlbmREYXRlLnNldERhdGUoZW5kRGF0ZS5nZXREYXRlKCkgKyAxKTtcblxuICAgIGNvbnN0IGRheVN0YXJ0ID0gZGF5LmdldFRpbWUoKTtcbiAgICBjb25zdCBkYXlFbmQgPSBlbmREYXRlLmdldFRpbWUoKTtcblxuICAgIGNvbnN0IGV2ZW50cyA9IHRoaXMuZXZlbnRzLmZpbHRlcihcbiAgICAgIG0gPT5cbiAgICAgICAgbS5yZXNvdXJjZU51bWJlciA9PT0gcmVzb3VyY2VOdW1iZXIgJiZcbiAgICAgICAgbS5zdGFydFRpbWUuZ2V0VGltZSgpID49IGRheVN0YXJ0ICYmXG4gICAgICAgIG0uZW5kVGltZS5nZXRUaW1lKCkgPCBkYXlFbmRcbiAgICApO1xuXG4gICAgLy8gQ2FsY3VsYXRlIHBvc3Rpb24gYW5kIGhlaWdodCBmb3IgZXZlbnRzXG4gICAgcmV0dXJuIGV2ZW50cy5tYXAoZXZlbnQgPT4ge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgZGF0YTogZXZlbnQsXG4gICAgICAgIHBvc2l0aW9uOiB0aGlzLmNhbGN1bGF0ZVBvc2l0aW9uKGV2ZW50LCBkYXkpLFxuICAgICAgICBoZWlnaHQ6IHRoaXMuY2FsY3VsYXRlSGVpZ2h0KGV2ZW50KVxuICAgICAgfTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDYWxjdWxhdGVzIGV2ZW50cyB0b3AgcG9zaXRpb24uIEZsb29ycyB0byBjbG9zZXN0IG1pbnV0ZS5cbiAgICpcbiAgICogQHBhcmFtIGV2ZW50IEV2ZW50XG4gICAqL1xuICBwcml2YXRlIGNhbGN1bGF0ZVBvc2l0aW9uKGV2ZW50OiBFdmVudE1vZGVsLCBkYXk6IERhdGUpOiBudW1iZXIge1xuICAgIGNvbnN0IGRpZmZJbk1pbnV0ZXMgPVxuICAgICAgKGV2ZW50LnN0YXJ0VGltZS5nZXRUaW1lKCkgLVxuICAgICAgICBkYXkuZ2V0VGltZSgpKSAvIDEwMDAgLyA2MDtcblxuICAgIHJldHVybiAoXG4gICAgICBNYXRoLmZsb29yKGRpZmZJbk1pbnV0ZXMgLyB0aGlzLnNsb3REdXJhdGlvbkluTWludXRlcykgKiB0aGlzLmhlaWdodCArXG4gICAgICBNYXRoLmZsb29yKGRpZmZJbk1pbnV0ZXMgLyA2MCkgKiB0aGlzLmhvdXJCb3JkZXJIZWlnaHRcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIENhbGN1bGF0ZXMgZXZlbnRzIGhlaWdodC4gRmxvb3JzIHRvIG5lYXJlc3QgbWludXRlLlxuICAgKlxuICAgKiBAcGFyYW0gZXZlbnQgRXZlbnRcbiAgICovXG4gIHByaXZhdGUgY2FsY3VsYXRlSGVpZ2h0KGV2ZW50OiBFdmVudE1vZGVsKTogbnVtYmVyIHtcbiAgICBjb25zdCBkaWZmSW5NaW51dGVzID1cbiAgICAgIChldmVudC5lbmRUaW1lLmdldFRpbWUoKSAtIGV2ZW50LnN0YXJ0VGltZS5nZXRUaW1lKCkpIC8gMTAwMCAvIDYwO1xuXG4gICAgaWYgKGRpZmZJbk1pbnV0ZXMgPD0gMCkge1xuICAgICAgcmV0dXJuIDEgKiB0aGlzLmhlaWdodDtcbiAgICB9XG5cbiAgICBsZXQgaG91cnNEaWZmID0gZXZlbnQuZW5kVGltZS5nZXRIb3VycygpIC0gZXZlbnQuc3RhcnRUaW1lLmdldEhvdXJzKCk7XG5cbiAgICAvLyBJZiBlbmQgdGltZSBlbmRzIHdpdGggMCBtaW51dGVzIGxpa2UgMTY6MDAsIGRvbid0IGFkZCBob3VyIGRpZmYgYXMgaXQgZW5kcyBpbiAxNTp4eCAtIDE2OjAwIHNsb3RcbiAgICBpZiAoZXZlbnQuZW5kVGltZS5nZXRNaW51dGVzKCkgPT09IDAgJiYgaG91cnNEaWZmID4gMCkge1xuICAgICAgaG91cnNEaWZmLS07XG4gICAgfVxuXG4gICAgcmV0dXJuIChcbiAgICAgIChkaWZmSW5NaW51dGVzIC8gdGhpcy5zbG90RHVyYXRpb25Jbk1pbnV0ZXMpICogdGhpcy5oZWlnaHQgK1xuICAgICAgaG91cnNEaWZmICogdGhpcy5ob3VyQm9yZGVySGVpZ2h0XG4gICAgKTtcbiAgfVxufVxuIl19