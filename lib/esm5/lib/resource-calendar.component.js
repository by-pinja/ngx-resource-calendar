/**
 * @fileoverview added by tsickle
 * Generated from: lib/resource-calendar.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, TemplateRef, Input, ChangeDetectionStrategy } from '@angular/core';
var ResourceCalendarComponent = /** @class */ (function () {
    function ResourceCalendarComponent() {
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
    ResourceCalendarComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        if (changes.dates && changes.dates.currentValue) {
            /** @type {?} */
            var dates = changes.dates.currentValue;
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
    };
    /**
     * @private
     * @return {?}
     */
    ResourceCalendarComponent.prototype.setResourceEvents = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.dates && this.dates.length > 0) {
            this.datesWithEvents = [];
            this.dates.forEach((/**
             * @param {?} d
             * @return {?}
             */
            function (d) {
                /** @type {?} */
                var resources = [];
                d.resources.forEach((/**
                 * @param {?} r
                 * @return {?}
                 */
                function (r) {
                    resources.push({
                        data: r,
                        hours: r.hours,
                        events: _this.getEvents(r.resourceNumber, r.hours[0].slots[0].time)
                    });
                }));
                _this.datesWithEvents.push({
                    data: d,
                    resources: resources
                });
            }));
        }
    };
    /**
     * Gets events for a day's resource
     */
    /**
     * Gets events for a day's resource
     * @private
     * @param {?} resourceNumber
     * @param {?} day
     * @return {?}
     */
    ResourceCalendarComponent.prototype.getEvents = /**
     * Gets events for a day's resource
     * @private
     * @param {?} resourceNumber
     * @param {?} day
     * @return {?}
     */
    function (resourceNumber, day) {
        var _this = this;
        if (!this.events || this.events.length === 0) {
            return [];
        }
        /** @type {?} */
        var endDate = new Date(day);
        endDate.setDate(endDate.getDate() + 1);
        /** @type {?} */
        var dayStart = day.getTime();
        /** @type {?} */
        var dayEnd = endDate.getTime();
        /** @type {?} */
        var events = this.events.filter((/**
         * @param {?} m
         * @return {?}
         */
        function (m) {
            return m.resourceNumber === resourceNumber &&
                m.startTime.getTime() >= dayStart &&
                m.endTime.getTime() < dayEnd;
        }));
        // Calculate postion and height for events
        return events.map((/**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            return {
                data: event,
                position: _this.calculatePosition(event, day),
                height: _this.calculateHeight(event)
            };
        }));
    };
    /**
     * Calculates events top position. Floors to closest minute.
     *
     * @param event Event
     */
    /**
     * Calculates events top position. Floors to closest minute.
     *
     * @private
     * @param {?} event Event
     * @param {?} day
     * @return {?}
     */
    ResourceCalendarComponent.prototype.calculatePosition = /**
     * Calculates events top position. Floors to closest minute.
     *
     * @private
     * @param {?} event Event
     * @param {?} day
     * @return {?}
     */
    function (event, day) {
        /** @type {?} */
        var diffInMinutes = (event.startTime.getTime() -
            day.getTime()) / 1000 / 60;
        return (Math.floor(diffInMinutes / this.slotDurationInMinutes) * this.height +
            Math.floor(diffInMinutes / 60) * this.hourBorderHeight);
    };
    /**
     * Calculates events height. Floors to nearest minute.
     *
     * @param event Event
     */
    /**
     * Calculates events height. Floors to nearest minute.
     *
     * @private
     * @param {?} event Event
     * @return {?}
     */
    ResourceCalendarComponent.prototype.calculateHeight = /**
     * Calculates events height. Floors to nearest minute.
     *
     * @private
     * @param {?} event Event
     * @return {?}
     */
    function (event) {
        /** @type {?} */
        var diffInMinutes = (event.endTime.getTime() - event.startTime.getTime()) / 1000 / 60;
        if (diffInMinutes <= 0) {
            return 1 * this.height;
        }
        /** @type {?} */
        var hoursDiff = event.endTime.getHours() - event.startTime.getHours();
        // If end time ends with 0 minutes like 16:00, don't add hour diff as it ends in 15:xx - 16:00 slot
        if (event.endTime.getMinutes() === 0 && hoursDiff > 0) {
            hoursDiff--;
        }
        return ((diffInMinutes / this.slotDurationInMinutes) * this.height +
            hoursDiff * this.hourBorderHeight);
    };
    ResourceCalendarComponent.decorators = [
        { type: Component, args: [{
                    selector: 'pro-resource-calendar',
                    template: "\n<div class=\"header\">\n  <div class=\"hour-row info-block\">\n    <ng-template\n      [ngTemplateOutlet]=\"infoTemplate || defaultInfoTemplate\"\n    ></ng-template>\n  </div>\n  <div class=\"day-row\" *ngFor=\"let date of datesWithEvents\">\n    <ng-template\n      [ngTemplateOutlet]=\"dayTemplate || defaultDayTemplate\"\n      [ngTemplateOutletContext]=\"{ day: date.data }\"\n    ></ng-template>\n    <div class=\"resources\">\n      <div\n        class=\"resource\"\n        [style.max-width.%]=\"100 / date.resources.length\"\n        *ngFor=\"let resource of date.resources\"\n      >\n        <ng-template\n          [ngTemplateOutlet]=\"resourceTemplate || defaultResourceTemplate\"\n          [ngTemplateOutletContext]=\"{ resource: resource.data }\"\n        ></ng-template>\n      </div>\n    </div>\n  </div>\n</div>\n<div class=\"calendar\">\n  <div class=\"hour-row\">\n    <div *ngFor=\"let hour of hours\">\n      <div class=\"hour-slot\">\n        <div\n          class=\"hour-sub-slot\"\n          [style.height.px]=\"height\"\n          *ngFor=\"let slot of hour.slots\"\n        >\n          <ng-template\n            [ngTemplateOutlet]=\"hourTemplate || defaultHourTemplate\"\n            [ngTemplateOutletContext]=\"{ slot: slot }\"\n          ></ng-template>\n        </div>\n      </div>\n    </div>\n  </div>\n  <div *ngFor=\"let date of datesWithEvents\" class=\"day-row resources\">\n    <ng-template\n      [ngTemplateOutlet]=\"currentTimeTemplate || defaultCurrentTimeTemplate\"\n      [ngTemplateOutletContext]=\"{ day: date.data }\"\n    ></ng-template>\n    <div\n      class=\"resource\"\n      [style.max-width.%]=\"100 / date.resources.length\"\n      *ngFor=\"let resource of date.resources\"\n    >\n      <div\n        *ngFor=\"let event of resource.events\"\n        [style.top.px]=\"event.position\"\n        [style.height.px]=\"event.height\"\n        class=\"event\"\n      >\n        <ng-template\n          [ngTemplateOutlet]=\"eventTemplate || defaultEventTemplate\"\n          [ngTemplateOutletContext]=\"{ event: event.data, resource: resource.data, day: date.data }\"\n        ></ng-template>\n      </div>\n\n      <div class=\"hour-slot\" *ngFor=\"let hour of resource.hours\">\n        <div\n          class=\"hour-sub-slot\"\n          [style.height.px]=\"height\"\n          *ngFor=\"let slot of hour.slots\"\n        >\n          <ng-template\n            [ngTemplateOutlet]=\"slotTemplate || defaultSlotTemplate\"\n            [ngTemplateOutletContext]=\"{\n              slot: slot,\n              resource: resource.data,\n              day: date.data\n            }\"\n          ></ng-template>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n\n<ng-template #defaultInfoTemplate></ng-template>\n<ng-template #defaultDayTemplate let-day=\"day\">{{ day.day | date: 'shortDate' }}</ng-template>\n<ng-template #defaultResourceTemplate let-resource=\"resource\">{{\n  resource.resourceNumber\n}}</ng-template>\n<ng-template #defaultHourTemplate let-slot=\"slot\">{{ slot.time | date: 'shortTime' }}</ng-template>\n<ng-template #defaultCurrentTimeTemplate let-day=\"day\"></ng-template>\n<ng-template #defaultEventTemplate let-event=\"event\">{{\n  event.resourceNumber\n}}</ng-template>\n<ng-template #defaultSlotTemplate let-slot=\"slot\">{{ slot.time | date: 'shortTime' }}</ng-template>\n  ",
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    styles: ["\n.header {\n  flex-direction: row;\n  box-sizing: border-box;\n  display: flex;\n  place-content: stretch flex-start;\n  align-items: stretch;\n}\n\n.calendar {\n  flex-direction: row;\n  box-sizing: border-box;\n  display: flex;\n  place-content: stretch flex-start;\n  align-items: stretch;\n}\n\n.resources {\n  flex-direction: row;\n  box-sizing: border-box;\n  display: flex;\n  place-content: stretch flex-start;\n  align-items: stretch;\n}\n\n.resource {\n  flex: 1 1 100%;\n  position: relative;\n  box-sizing: border-box;\n}\n\n.hour-sub-slot {\n  display: flex;\n  align-items: center;\n  justify-content: flex-end;\n}\n\n.hour-row {\n  width: 10%;\n  min-width: 50px;\n}\n\n.day-row {\n  position: relative;\n  width: 90%;\n}\n\n.event {\n  position: absolute;\n  z-index: 1;\n  width: 100%;\n  overflow: hidden;\n}\n  "]
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
    return ResourceCalendarComponent;
}());
export { ResourceCalendarComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzb3VyY2UtY2FsZW5kYXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHByb3RhY29uL25neC1yZXNvdXJjZS1jYWxlbmRhci8iLCJzb3VyY2VzIjpbImxpYi9yZXNvdXJjZS1jYWxlbmRhci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUUsdUJBQXVCLEVBQTRCLE1BQU0sZUFBZSxDQUFDO0FBS2pIO0lBQUE7Ozs7O1FBZ0tXLFVBQUssR0FBZSxFQUFFLENBQUM7Ozs7UUFLdkIsV0FBTSxHQUFpQixFQUFFLENBQUM7Ozs7UUFLMUIsMEJBQXFCLEdBQUcsRUFBRSxDQUFDOzs7O1FBSzNCLFdBQU0sR0FBRyxFQUFFLENBQUM7Ozs7UUFLWixxQkFBZ0IsR0FBRyxDQUFDLENBQUM7Ozs7UUF5Q3ZCLFVBQUssR0FBZ0IsRUFBRSxDQUFDOzs7O1FBS3hCLG9CQUFlLEdBQVUsRUFBRSxDQUFDO0lBaUhyQyxDQUFDOzs7OztJQS9HUSwrQ0FBVzs7OztJQUFsQixVQUFtQixPQUFzQjtRQUN2QyxJQUFJLE9BQU8sQ0FBQyxLQUFLLElBQUksT0FBTyxDQUFDLEtBQUssQ0FBQyxZQUFZLEVBQUU7O2dCQUN6QyxLQUFLLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxZQUFZO1lBQ3hDLElBQUksS0FBSyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7Z0JBQ3RCLElBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO2FBQ2pCO2lCQUFNO2dCQUNMLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7YUFDMUM7WUFDRCxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztTQUMxQjthQUFNLElBQUksT0FBTyxDQUFDLE1BQU0sSUFBSSxPQUFPLENBQUMsTUFBTSxDQUFDLFlBQVksRUFBRTtZQUN4RCxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztTQUMxQjtJQUNILENBQUM7Ozs7O0lBRU8scURBQWlCOzs7O0lBQXpCO1FBQUEsaUJBb0JDO1FBbkJDLElBQUksSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7WUFDdkMsSUFBSSxDQUFDLGVBQWUsR0FBRyxFQUFFLENBQUM7WUFDMUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPOzs7O1lBQUMsVUFBQSxDQUFDOztvQkFDWixTQUFTLEdBQUcsRUFBRTtnQkFFcEIsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxPQUFPOzs7O2dCQUFDLFVBQUEsQ0FBQztvQkFDbkIsU0FBUyxDQUFDLElBQUksQ0FBQzt3QkFDYixJQUFJLEVBQUUsQ0FBQzt3QkFDUCxLQUFLLEVBQUUsQ0FBQyxDQUFDLEtBQUs7d0JBQ2QsTUFBTSxFQUFFLEtBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLGNBQWMsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7cUJBQ25FLENBQUMsQ0FBQztnQkFDTCxDQUFDLEVBQUMsQ0FBQztnQkFFSCxLQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQztvQkFDeEIsSUFBSSxFQUFFLENBQUM7b0JBQ1AsU0FBUyxXQUFBO2lCQUNWLENBQUMsQ0FBQztZQUNMLENBQUMsRUFBQyxDQUFDO1NBQ0o7SUFDSCxDQUFDO0lBRUQ7O09BRUc7Ozs7Ozs7O0lBQ0ssNkNBQVM7Ozs7Ozs7SUFBakIsVUFDRSxjQUErQixFQUMvQixHQUFTO1FBRlgsaUJBNkJDO1FBekJDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtZQUM1QyxPQUFPLEVBQUUsQ0FBQztTQUNYOztZQUVLLE9BQU8sR0FBRyxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUM7UUFDN0IsT0FBTyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7O1lBRWpDLFFBQVEsR0FBRyxHQUFHLENBQUMsT0FBTyxFQUFFOztZQUN4QixNQUFNLEdBQUcsT0FBTyxDQUFDLE9BQU8sRUFBRTs7WUFFMUIsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTTs7OztRQUMvQixVQUFBLENBQUM7WUFDQyxPQUFBLENBQUMsQ0FBQyxjQUFjLEtBQUssY0FBYztnQkFDbkMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUUsSUFBSSxRQUFRO2dCQUNqQyxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxHQUFHLE1BQU07UUFGNUIsQ0FFNEIsRUFDL0I7UUFFRCwwQ0FBMEM7UUFDMUMsT0FBTyxNQUFNLENBQUMsR0FBRzs7OztRQUFDLFVBQUEsS0FBSztZQUNyQixPQUFPO2dCQUNMLElBQUksRUFBRSxLQUFLO2dCQUNYLFFBQVEsRUFBRSxLQUFJLENBQUMsaUJBQWlCLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQztnQkFDNUMsTUFBTSxFQUFFLEtBQUksQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDO2FBQ3BDLENBQUM7UUFDSixDQUFDLEVBQUMsQ0FBQztJQUNMLENBQUM7SUFFRDs7OztPQUlHOzs7Ozs7Ozs7SUFDSyxxREFBaUI7Ozs7Ozs7O0lBQXpCLFVBQTBCLEtBQWlCLEVBQUUsR0FBUzs7WUFDOUMsYUFBYSxHQUNqQixDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFFO1lBQ3hCLEdBQUcsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxHQUFHLElBQUksR0FBRyxFQUFFO1FBRTlCLE9BQU8sQ0FDTCxJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMscUJBQXFCLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTTtZQUNwRSxJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsR0FBRyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQ3ZELENBQUM7SUFDSixDQUFDO0lBRUQ7Ozs7T0FJRzs7Ozs7Ozs7SUFDSyxtREFBZTs7Ozs7OztJQUF2QixVQUF3QixLQUFpQjs7WUFDakMsYUFBYSxHQUNqQixDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLEdBQUcsS0FBSyxDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxHQUFHLElBQUksR0FBRyxFQUFFO1FBRW5FLElBQUksYUFBYSxJQUFJLENBQUMsRUFBRTtZQUN0QixPQUFPLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO1NBQ3hCOztZQUVHLFNBQVMsR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxHQUFHLEtBQUssQ0FBQyxTQUFTLENBQUMsUUFBUSxFQUFFO1FBRXJFLG1HQUFtRztRQUNuRyxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLEtBQUssQ0FBQyxJQUFJLFNBQVMsR0FBRyxDQUFDLEVBQUU7WUFDckQsU0FBUyxFQUFFLENBQUM7U0FDYjtRQUVELE9BQU8sQ0FDTCxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMscUJBQXFCLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTTtZQUMxRCxTQUFTLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUNsQyxDQUFDO0lBQ0osQ0FBQzs7Z0JBbFZGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsdUJBQXVCO29CQUNqQyxRQUFRLEVBQUUsc3lHQWdHVDtvQkF1REQsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07NkJBdER0QyxpMEJBcURSO2lCQUVGOzs7d0JBTUUsS0FBSzt5QkFLTCxLQUFLO3dDQUtMLEtBQUs7eUJBS0wsS0FBSzttQ0FLTCxLQUFLOytCQUtMLEtBQUs7OEJBS0wsS0FBSzttQ0FLTCxLQUFLOytCQUtMLEtBQUs7Z0NBS0wsS0FBSzsrQkFLTCxLQUFLO3NDQUtMLEtBQUs7O0lBNEhSLGdDQUFDO0NBQUEsQUFuVkQsSUFtVkM7U0F4TFkseUJBQXlCOzs7Ozs7O0lBS3BDLDBDQUFnQzs7Ozs7SUFLaEMsMkNBQW1DOzs7OztJQUtuQywwREFBb0M7Ozs7O0lBS3BDLDJDQUFxQjs7Ozs7SUFLckIscURBQThCOzs7OztJQUs5QixpREFBd0M7Ozs7O0lBS3hDLGdEQUF1Qzs7Ozs7SUFLdkMscURBQTRDOzs7OztJQUs1QyxpREFBd0M7Ozs7O0lBS3hDLGtEQUF5Qzs7Ozs7SUFLekMsaURBQXdDOzs7OztJQUt4Qyx3REFBK0M7Ozs7O0lBTS9DLDBDQUErQjs7Ozs7SUFLL0Isb0RBQW1DIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBUZW1wbGF0ZVJlZiwgSW5wdXQsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBPbkNoYW5nZXMsIFNpbXBsZUNoYW5nZXMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEV2ZW50TW9kZWwgfSBmcm9tICcuL21vZGVscy9ldmVudC5tb2RlbCc7XG5pbXBvcnQgeyBEYXlNb2RlbCB9IGZyb20gJy4vbW9kZWxzL2RheS5tb2RlbCc7XG5pbXBvcnQgeyBIb3VyTW9kZWwgfSBmcm9tICcuL21vZGVscy9ob3VyLm1vZGVsJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAncHJvLXJlc291cmNlLWNhbGVuZGFyJyxcbiAgdGVtcGxhdGU6IGBcbjxkaXYgY2xhc3M9XCJoZWFkZXJcIj5cbiAgPGRpdiBjbGFzcz1cImhvdXItcm93IGluZm8tYmxvY2tcIj5cbiAgICA8bmctdGVtcGxhdGVcbiAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0XT1cImluZm9UZW1wbGF0ZSB8fCBkZWZhdWx0SW5mb1RlbXBsYXRlXCJcbiAgICA+PC9uZy10ZW1wbGF0ZT5cbiAgPC9kaXY+XG4gIDxkaXYgY2xhc3M9XCJkYXktcm93XCIgKm5nRm9yPVwibGV0IGRhdGUgb2YgZGF0ZXNXaXRoRXZlbnRzXCI+XG4gICAgPG5nLXRlbXBsYXRlXG4gICAgICBbbmdUZW1wbGF0ZU91dGxldF09XCJkYXlUZW1wbGF0ZSB8fCBkZWZhdWx0RGF5VGVtcGxhdGVcIlxuICAgICAgW25nVGVtcGxhdGVPdXRsZXRDb250ZXh0XT1cInsgZGF5OiBkYXRlLmRhdGEgfVwiXG4gICAgPjwvbmctdGVtcGxhdGU+XG4gICAgPGRpdiBjbGFzcz1cInJlc291cmNlc1wiPlxuICAgICAgPGRpdlxuICAgICAgICBjbGFzcz1cInJlc291cmNlXCJcbiAgICAgICAgW3N0eWxlLm1heC13aWR0aC4lXT1cIjEwMCAvIGRhdGUucmVzb3VyY2VzLmxlbmd0aFwiXG4gICAgICAgICpuZ0Zvcj1cImxldCByZXNvdXJjZSBvZiBkYXRlLnJlc291cmNlc1wiXG4gICAgICA+XG4gICAgICAgIDxuZy10ZW1wbGF0ZVxuICAgICAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0XT1cInJlc291cmNlVGVtcGxhdGUgfHwgZGVmYXVsdFJlc291cmNlVGVtcGxhdGVcIlxuICAgICAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0Q29udGV4dF09XCJ7IHJlc291cmNlOiByZXNvdXJjZS5kYXRhIH1cIlxuICAgICAgICA+PC9uZy10ZW1wbGF0ZT5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICA8L2Rpdj5cbjwvZGl2PlxuPGRpdiBjbGFzcz1cImNhbGVuZGFyXCI+XG4gIDxkaXYgY2xhc3M9XCJob3VyLXJvd1wiPlxuICAgIDxkaXYgKm5nRm9yPVwibGV0IGhvdXIgb2YgaG91cnNcIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJob3VyLXNsb3RcIj5cbiAgICAgICAgPGRpdlxuICAgICAgICAgIGNsYXNzPVwiaG91ci1zdWItc2xvdFwiXG4gICAgICAgICAgW3N0eWxlLmhlaWdodC5weF09XCJoZWlnaHRcIlxuICAgICAgICAgICpuZ0Zvcj1cImxldCBzbG90IG9mIGhvdXIuc2xvdHNcIlxuICAgICAgICA+XG4gICAgICAgICAgPG5nLXRlbXBsYXRlXG4gICAgICAgICAgICBbbmdUZW1wbGF0ZU91dGxldF09XCJob3VyVGVtcGxhdGUgfHwgZGVmYXVsdEhvdXJUZW1wbGF0ZVwiXG4gICAgICAgICAgICBbbmdUZW1wbGF0ZU91dGxldENvbnRleHRdPVwieyBzbG90OiBzbG90IH1cIlxuICAgICAgICAgID48L25nLXRlbXBsYXRlPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICA8L2Rpdj5cbiAgPGRpdiAqbmdGb3I9XCJsZXQgZGF0ZSBvZiBkYXRlc1dpdGhFdmVudHNcIiBjbGFzcz1cImRheS1yb3cgcmVzb3VyY2VzXCI+XG4gICAgPG5nLXRlbXBsYXRlXG4gICAgICBbbmdUZW1wbGF0ZU91dGxldF09XCJjdXJyZW50VGltZVRlbXBsYXRlIHx8IGRlZmF1bHRDdXJyZW50VGltZVRlbXBsYXRlXCJcbiAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0Q29udGV4dF09XCJ7IGRheTogZGF0ZS5kYXRhIH1cIlxuICAgID48L25nLXRlbXBsYXRlPlxuICAgIDxkaXZcbiAgICAgIGNsYXNzPVwicmVzb3VyY2VcIlxuICAgICAgW3N0eWxlLm1heC13aWR0aC4lXT1cIjEwMCAvIGRhdGUucmVzb3VyY2VzLmxlbmd0aFwiXG4gICAgICAqbmdGb3I9XCJsZXQgcmVzb3VyY2Ugb2YgZGF0ZS5yZXNvdXJjZXNcIlxuICAgID5cbiAgICAgIDxkaXZcbiAgICAgICAgKm5nRm9yPVwibGV0IGV2ZW50IG9mIHJlc291cmNlLmV2ZW50c1wiXG4gICAgICAgIFtzdHlsZS50b3AucHhdPVwiZXZlbnQucG9zaXRpb25cIlxuICAgICAgICBbc3R5bGUuaGVpZ2h0LnB4XT1cImV2ZW50LmhlaWdodFwiXG4gICAgICAgIGNsYXNzPVwiZXZlbnRcIlxuICAgICAgPlxuICAgICAgICA8bmctdGVtcGxhdGVcbiAgICAgICAgICBbbmdUZW1wbGF0ZU91dGxldF09XCJldmVudFRlbXBsYXRlIHx8IGRlZmF1bHRFdmVudFRlbXBsYXRlXCJcbiAgICAgICAgICBbbmdUZW1wbGF0ZU91dGxldENvbnRleHRdPVwieyBldmVudDogZXZlbnQuZGF0YSwgcmVzb3VyY2U6IHJlc291cmNlLmRhdGEsIGRheTogZGF0ZS5kYXRhIH1cIlxuICAgICAgICA+PC9uZy10ZW1wbGF0ZT5cbiAgICAgIDwvZGl2PlxuXG4gICAgICA8ZGl2IGNsYXNzPVwiaG91ci1zbG90XCIgKm5nRm9yPVwibGV0IGhvdXIgb2YgcmVzb3VyY2UuaG91cnNcIj5cbiAgICAgICAgPGRpdlxuICAgICAgICAgIGNsYXNzPVwiaG91ci1zdWItc2xvdFwiXG4gICAgICAgICAgW3N0eWxlLmhlaWdodC5weF09XCJoZWlnaHRcIlxuICAgICAgICAgICpuZ0Zvcj1cImxldCBzbG90IG9mIGhvdXIuc2xvdHNcIlxuICAgICAgICA+XG4gICAgICAgICAgPG5nLXRlbXBsYXRlXG4gICAgICAgICAgICBbbmdUZW1wbGF0ZU91dGxldF09XCJzbG90VGVtcGxhdGUgfHwgZGVmYXVsdFNsb3RUZW1wbGF0ZVwiXG4gICAgICAgICAgICBbbmdUZW1wbGF0ZU91dGxldENvbnRleHRdPVwie1xuICAgICAgICAgICAgICBzbG90OiBzbG90LFxuICAgICAgICAgICAgICByZXNvdXJjZTogcmVzb3VyY2UuZGF0YSxcbiAgICAgICAgICAgICAgZGF5OiBkYXRlLmRhdGFcbiAgICAgICAgICAgIH1cIlxuICAgICAgICAgID48L25nLXRlbXBsYXRlPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICA8L2Rpdj5cbjwvZGl2PlxuXG48bmctdGVtcGxhdGUgI2RlZmF1bHRJbmZvVGVtcGxhdGU+PC9uZy10ZW1wbGF0ZT5cbjxuZy10ZW1wbGF0ZSAjZGVmYXVsdERheVRlbXBsYXRlIGxldC1kYXk9XCJkYXlcIj57eyBkYXkuZGF5IHwgZGF0ZTogJ3Nob3J0RGF0ZScgfX08L25nLXRlbXBsYXRlPlxuPG5nLXRlbXBsYXRlICNkZWZhdWx0UmVzb3VyY2VUZW1wbGF0ZSBsZXQtcmVzb3VyY2U9XCJyZXNvdXJjZVwiPnt7XG4gIHJlc291cmNlLnJlc291cmNlTnVtYmVyXG59fTwvbmctdGVtcGxhdGU+XG48bmctdGVtcGxhdGUgI2RlZmF1bHRIb3VyVGVtcGxhdGUgbGV0LXNsb3Q9XCJzbG90XCI+e3sgc2xvdC50aW1lIHwgZGF0ZTogJ3Nob3J0VGltZScgfX08L25nLXRlbXBsYXRlPlxuPG5nLXRlbXBsYXRlICNkZWZhdWx0Q3VycmVudFRpbWVUZW1wbGF0ZSBsZXQtZGF5PVwiZGF5XCI+PC9uZy10ZW1wbGF0ZT5cbjxuZy10ZW1wbGF0ZSAjZGVmYXVsdEV2ZW50VGVtcGxhdGUgbGV0LWV2ZW50PVwiZXZlbnRcIj57e1xuICBldmVudC5yZXNvdXJjZU51bWJlclxufX08L25nLXRlbXBsYXRlPlxuPG5nLXRlbXBsYXRlICNkZWZhdWx0U2xvdFRlbXBsYXRlIGxldC1zbG90PVwic2xvdFwiPnt7IHNsb3QudGltZSB8IGRhdGU6ICdzaG9ydFRpbWUnIH19PC9uZy10ZW1wbGF0ZT5cbiAgYCxcbiAgc3R5bGVzOiBbYFxuLmhlYWRlciB7XG4gIGZsZXgtZGlyZWN0aW9uOiByb3c7XG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIHBsYWNlLWNvbnRlbnQ6IHN0cmV0Y2ggZmxleC1zdGFydDtcbiAgYWxpZ24taXRlbXM6IHN0cmV0Y2g7XG59XG5cbi5jYWxlbmRhciB7XG4gIGZsZXgtZGlyZWN0aW9uOiByb3c7XG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIHBsYWNlLWNvbnRlbnQ6IHN0cmV0Y2ggZmxleC1zdGFydDtcbiAgYWxpZ24taXRlbXM6IHN0cmV0Y2g7XG59XG5cbi5yZXNvdXJjZXMge1xuICBmbGV4LWRpcmVjdGlvbjogcm93O1xuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICBkaXNwbGF5OiBmbGV4O1xuICBwbGFjZS1jb250ZW50OiBzdHJldGNoIGZsZXgtc3RhcnQ7XG4gIGFsaWduLWl0ZW1zOiBzdHJldGNoO1xufVxuXG4ucmVzb3VyY2Uge1xuICBmbGV4OiAxIDEgMTAwJTtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xufVxuXG4uaG91ci1zdWItc2xvdCB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogZmxleC1lbmQ7XG59XG5cbi5ob3VyLXJvdyB7XG4gIHdpZHRoOiAxMCU7XG4gIG1pbi13aWR0aDogNTBweDtcbn1cblxuLmRheS1yb3cge1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIHdpZHRoOiA5MCU7XG59XG5cbi5ldmVudCB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgei1pbmRleDogMTtcbiAgd2lkdGg6IDEwMCU7XG4gIG92ZXJmbG93OiBoaWRkZW47XG59XG4gIGBdLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBSZXNvdXJjZUNhbGVuZGFyQ29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzIHtcbiAgLyoqXG4gICAqIEFuIGFycmF5IG9mIGRhdGVzIHRvIHNob3cgb24gdmlldy5cbiAgICogTk9URTogSG91cnMgYXJlIGRyYXduIGZyb20gdGhlIGFycmF5cyBmaXJzdCBkYXkncyBmaXJzdCByZXNvdXJjZS5cbiAgICovXG4gIEBJbnB1dCgpIGRhdGVzOiBEYXlNb2RlbFtdID0gW107XG5cbiAgLyoqXG4gICAqIEFuIGFycmF5IG9mIGV2ZW50cyB0byBzaG93IG9uIHZpZXcuXG4gICAqL1xuICBASW5wdXQoKSBldmVudHM6IEV2ZW50TW9kZWxbXSA9IFtdO1xuXG4gIC8qKlxuICAgKiBIb3cgbG9uZyBpcyBvbmUgc2xvdCBkdXJhdGlvbiBpbiBtaW51dGVzLlxuICAgKi9cbiAgQElucHV0KCkgc2xvdER1cmF0aW9uSW5NaW51dGVzID0gMTU7XG5cbiAgLyoqXG4gICAqIEhlaWdodCBvZiBvbmUgc2xvdCBpbiBwaXhlbHMuXG4gICAqL1xuICBASW5wdXQoKSBoZWlnaHQgPSA2MDtcblxuICAvKipcbiAgICogSWYgZXZlcnkgaG91ciBjb250YWlucyBib3JkZXIgb3IgbWFyZ2luIGV0Yy4gVGhpcyB2YWx1ZSBuZWVkcyB0byBiZSB0aGF0IGhlaWdodCBpbiBwaXhlbHMuXG4gICAqL1xuICBASW5wdXQoKSBob3VyQm9yZGVySGVpZ2h0ID0gMTtcblxuICAvKipcbiAgICogQSBjdXN0b20gdGVtcGxhdGUgdG8gdXNlIGZvciB0aGUgaGVhZGVyIGVtcHR5IHNwYWNlIHRvcCBvZiBob3Vycy5cbiAgICovXG4gIEBJbnB1dCgpIGluZm9UZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcblxuICAvKipcbiAgICogQSBjdXN0b20gdGVtcGxhdGUgdG8gdXNlIGZvciBkYXkgdmlldyBpbiBoZWFkZXIuXG4gICAqL1xuICBASW5wdXQoKSBkYXlUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcblxuICAvKipcbiAgICogQSBjdXN0b20gdGVtcGxhdGUgdG8gdXNlIGZvciBkYXkgdmlldyByZXNvdXJjZSBpbiBoZWFkZXIgKGJlbG93IGRheSB0ZW1wbGF0ZSkuXG4gICAqL1xuICBASW5wdXQoKSByZXNvdXJjZVRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gIC8qKlxuICAgKiBBIGN1c3RvbSB0ZW1wbGF0ZSB0byB1c2UgZm9yIGhvdXIgdmlldyAobGVmdCB0byBjYWxlbmRhcikuXG4gICAqL1xuICBASW5wdXQoKSBob3VyVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgLyoqXG4gICAqIEEgY3VzdG9tIHRlbXBsYXRlIHRvIHVzZSBmb3IgZXZlbnRzLlxuICAgKi9cbiAgQElucHV0KCkgZXZlbnRUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcblxuICAvKipcbiAgICogQSBjdXN0b20gdGVtcGxhdGUgdG8gdXNlIGZvciBzbG90cy5cbiAgICovXG4gIEBJbnB1dCgpIHNsb3RUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcblxuICAvKipcbiAgICogQSBjdXN0b20gdGVtcGxhdGUgdG8gc2hvdyBjdXJyZW50IHRpbWUgZXRjLiBjdXN0b20gb3ZlcmxheS5cbiAgICovXG4gIEBJbnB1dCgpIGN1cnJlbnRUaW1lVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG5cblxuICAvKipcbiAgICogSG91cnMgZm9yIHRoZSBjYWxlbmRhclxuICAgKi9cbiAgcHVibGljIGhvdXJzOiBIb3VyTW9kZWxbXSA9IFtdO1xuXG4gIC8qKlxuICAgKiBEYXRlcyB3aXRoIGV2ZW50cyBpbiByZXNvdXJjZXNcbiAgICovXG4gIHB1YmxpYyBkYXRlc1dpdGhFdmVudHM6IGFueVtdID0gW107XG5cbiAgcHVibGljIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICBpZiAoY2hhbmdlcy5kYXRlcyAmJiBjaGFuZ2VzLmRhdGVzLmN1cnJlbnRWYWx1ZSkge1xuICAgICAgY29uc3QgZGF0ZXMgPSBjaGFuZ2VzLmRhdGVzLmN1cnJlbnRWYWx1ZTtcbiAgICAgIGlmIChkYXRlcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgdGhpcy5ob3VycyA9IFtdO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5ob3VycyA9IGRhdGVzWzBdLnJlc291cmNlc1swXS5ob3VycztcbiAgICAgIH1cbiAgICAgIHRoaXMuc2V0UmVzb3VyY2VFdmVudHMoKTtcbiAgICB9IGVsc2UgaWYgKGNoYW5nZXMuZXZlbnRzICYmIGNoYW5nZXMuZXZlbnRzLmN1cnJlbnRWYWx1ZSkge1xuICAgICAgdGhpcy5zZXRSZXNvdXJjZUV2ZW50cygpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgc2V0UmVzb3VyY2VFdmVudHMoKSB7XG4gICAgaWYgKHRoaXMuZGF0ZXMgJiYgdGhpcy5kYXRlcy5sZW5ndGggPiAwKSB7XG4gICAgICB0aGlzLmRhdGVzV2l0aEV2ZW50cyA9IFtdO1xuICAgICAgdGhpcy5kYXRlcy5mb3JFYWNoKGQgPT4ge1xuICAgICAgICBjb25zdCByZXNvdXJjZXMgPSBbXTtcblxuICAgICAgICBkLnJlc291cmNlcy5mb3JFYWNoKHIgPT4ge1xuICAgICAgICAgIHJlc291cmNlcy5wdXNoKHtcbiAgICAgICAgICAgIGRhdGE6IHIsXG4gICAgICAgICAgICBob3Vyczogci5ob3VycyxcbiAgICAgICAgICAgIGV2ZW50czogdGhpcy5nZXRFdmVudHMoci5yZXNvdXJjZU51bWJlciwgci5ob3Vyc1swXS5zbG90c1swXS50aW1lKVxuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmRhdGVzV2l0aEV2ZW50cy5wdXNoKHtcbiAgICAgICAgICBkYXRhOiBkLFxuICAgICAgICAgIHJlc291cmNlc1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIGV2ZW50cyBmb3IgYSBkYXkncyByZXNvdXJjZVxuICAgKi9cbiAgcHJpdmF0ZSBnZXRFdmVudHMoXG4gICAgcmVzb3VyY2VOdW1iZXI6IG51bWJlciB8IHN0cmluZyxcbiAgICBkYXk6IERhdGVcbiAgKTogYW55W10ge1xuICAgIGlmICghdGhpcy5ldmVudHMgfHwgdGhpcy5ldmVudHMubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm4gW107XG4gICAgfVxuXG4gICAgY29uc3QgZW5kRGF0ZSA9IG5ldyBEYXRlKGRheSk7XG4gICAgZW5kRGF0ZS5zZXREYXRlKGVuZERhdGUuZ2V0RGF0ZSgpICsgMSk7XG5cbiAgICBjb25zdCBkYXlTdGFydCA9IGRheS5nZXRUaW1lKCk7XG4gICAgY29uc3QgZGF5RW5kID0gZW5kRGF0ZS5nZXRUaW1lKCk7XG5cbiAgICBjb25zdCBldmVudHMgPSB0aGlzLmV2ZW50cy5maWx0ZXIoXG4gICAgICBtID0+XG4gICAgICAgIG0ucmVzb3VyY2VOdW1iZXIgPT09IHJlc291cmNlTnVtYmVyICYmXG4gICAgICAgIG0uc3RhcnRUaW1lLmdldFRpbWUoKSA+PSBkYXlTdGFydCAmJlxuICAgICAgICBtLmVuZFRpbWUuZ2V0VGltZSgpIDwgZGF5RW5kXG4gICAgKTtcblxuICAgIC8vIENhbGN1bGF0ZSBwb3N0aW9uIGFuZCBoZWlnaHQgZm9yIGV2ZW50c1xuICAgIHJldHVybiBldmVudHMubWFwKGV2ZW50ID0+IHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGRhdGE6IGV2ZW50LFxuICAgICAgICBwb3NpdGlvbjogdGhpcy5jYWxjdWxhdGVQb3NpdGlvbihldmVudCwgZGF5KSxcbiAgICAgICAgaGVpZ2h0OiB0aGlzLmNhbGN1bGF0ZUhlaWdodChldmVudClcbiAgICAgIH07XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQ2FsY3VsYXRlcyBldmVudHMgdG9wIHBvc2l0aW9uLiBGbG9vcnMgdG8gY2xvc2VzdCBtaW51dGUuXG4gICAqXG4gICAqIEBwYXJhbSBldmVudCBFdmVudFxuICAgKi9cbiAgcHJpdmF0ZSBjYWxjdWxhdGVQb3NpdGlvbihldmVudDogRXZlbnRNb2RlbCwgZGF5OiBEYXRlKTogbnVtYmVyIHtcbiAgICBjb25zdCBkaWZmSW5NaW51dGVzID1cbiAgICAgIChldmVudC5zdGFydFRpbWUuZ2V0VGltZSgpIC1cbiAgICAgICAgZGF5LmdldFRpbWUoKSkgLyAxMDAwIC8gNjA7XG5cbiAgICByZXR1cm4gKFxuICAgICAgTWF0aC5mbG9vcihkaWZmSW5NaW51dGVzIC8gdGhpcy5zbG90RHVyYXRpb25Jbk1pbnV0ZXMpICogdGhpcy5oZWlnaHQgK1xuICAgICAgTWF0aC5mbG9vcihkaWZmSW5NaW51dGVzIC8gNjApICogdGhpcy5ob3VyQm9yZGVySGVpZ2h0XG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDYWxjdWxhdGVzIGV2ZW50cyBoZWlnaHQuIEZsb29ycyB0byBuZWFyZXN0IG1pbnV0ZS5cbiAgICpcbiAgICogQHBhcmFtIGV2ZW50IEV2ZW50XG4gICAqL1xuICBwcml2YXRlIGNhbGN1bGF0ZUhlaWdodChldmVudDogRXZlbnRNb2RlbCk6IG51bWJlciB7XG4gICAgY29uc3QgZGlmZkluTWludXRlcyA9XG4gICAgICAoZXZlbnQuZW5kVGltZS5nZXRUaW1lKCkgLSBldmVudC5zdGFydFRpbWUuZ2V0VGltZSgpKSAvIDEwMDAgLyA2MDtcblxuICAgIGlmIChkaWZmSW5NaW51dGVzIDw9IDApIHtcbiAgICAgIHJldHVybiAxICogdGhpcy5oZWlnaHQ7XG4gICAgfVxuXG4gICAgbGV0IGhvdXJzRGlmZiA9IGV2ZW50LmVuZFRpbWUuZ2V0SG91cnMoKSAtIGV2ZW50LnN0YXJ0VGltZS5nZXRIb3VycygpO1xuXG4gICAgLy8gSWYgZW5kIHRpbWUgZW5kcyB3aXRoIDAgbWludXRlcyBsaWtlIDE2OjAwLCBkb24ndCBhZGQgaG91ciBkaWZmIGFzIGl0IGVuZHMgaW4gMTU6eHggLSAxNjowMCBzbG90XG4gICAgaWYgKGV2ZW50LmVuZFRpbWUuZ2V0TWludXRlcygpID09PSAwICYmIGhvdXJzRGlmZiA+IDApIHtcbiAgICAgIGhvdXJzRGlmZi0tO1xuICAgIH1cblxuICAgIHJldHVybiAoXG4gICAgICAoZGlmZkluTWludXRlcyAvIHRoaXMuc2xvdER1cmF0aW9uSW5NaW51dGVzKSAqIHRoaXMuaGVpZ2h0ICtcbiAgICAgIGhvdXJzRGlmZiAqIHRoaXMuaG91ckJvcmRlckhlaWdodFxuICAgICk7XG4gIH1cbn1cbiJdfQ==