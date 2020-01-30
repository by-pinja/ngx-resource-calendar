(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('@protacon/ngx-resource-calendar', ['exports', '@angular/core', '@angular/common'], factory) :
    (global = global || self, factory((global.protacon = global.protacon || {}, global.protacon['ngx-resource-calendar'] = {}), global.ng.core, global.ng.common));
}(this, (function (exports, core, common) { 'use strict';

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/resource-calendar.component.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
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
            { type: core.Component, args: [{
                        selector: 'pro-resource-calendar',
                        template: "\n<div class=\"header\">\n  <div class=\"hour-row info-block\">\n    <ng-template\n      [ngTemplateOutlet]=\"infoTemplate || defaultInfoTemplate\"\n    ></ng-template>\n  </div>\n  <div class=\"day-row\" *ngFor=\"let date of datesWithEvents\">\n    <ng-template\n      [ngTemplateOutlet]=\"dayTemplate || defaultDayTemplate\"\n      [ngTemplateOutletContext]=\"{ day: date.data }\"\n    ></ng-template>\n    <div class=\"resources\">\n      <div\n        class=\"resource\"\n        [style.max-width.%]=\"100 / date.resources.length\"\n        *ngFor=\"let resource of date.resources\"\n      >\n        <ng-template\n          [ngTemplateOutlet]=\"resourceTemplate || defaultResourceTemplate\"\n          [ngTemplateOutletContext]=\"{ resource: resource.data }\"\n        ></ng-template>\n      </div>\n    </div>\n  </div>\n</div>\n<div class=\"calendar\">\n  <div class=\"hour-row\">\n    <div *ngFor=\"let hour of hours\">\n      <div class=\"hour-slot\">\n        <div\n          class=\"hour-sub-slot\"\n          [style.height.px]=\"height\"\n          *ngFor=\"let slot of hour.slots\"\n        >\n          <ng-template\n            [ngTemplateOutlet]=\"hourTemplate || defaultHourTemplate\"\n            [ngTemplateOutletContext]=\"{ slot: slot }\"\n          ></ng-template>\n        </div>\n      </div>\n    </div>\n  </div>\n  <div *ngFor=\"let date of datesWithEvents\" class=\"day-row resources\">\n    <ng-template\n      [ngTemplateOutlet]=\"currentTimeTemplate || defaultCurrentTimeTemplate\"\n      [ngTemplateOutletContext]=\"{ day: date.data }\"\n    ></ng-template>\n    <div\n      class=\"resource\"\n      [style.max-width.%]=\"100 / date.resources.length\"\n      *ngFor=\"let resource of date.resources\"\n    >\n      <div\n        *ngFor=\"let event of resource.events\"\n        [style.top.px]=\"event.position\"\n        [style.height.px]=\"event.height\"\n        class=\"event\"\n      >\n        <ng-template\n          [ngTemplateOutlet]=\"eventTemplate || defaultEventTemplate\"\n          [ngTemplateOutletContext]=\"{ event: event.data, resource: resource.data, day: date.data }\"\n        ></ng-template>\n      </div>\n\n      <div class=\"hour-slot\" *ngFor=\"let hour of resource.hours\">\n        <div\n          class=\"hour-sub-slot\"\n          [style.height.px]=\"height\"\n          *ngFor=\"let slot of hour.slots\"\n        >\n          <ng-template\n            [ngTemplateOutlet]=\"slotTemplate || defaultSlotTemplate\"\n            [ngTemplateOutletContext]=\"{\n              slot: slot,\n              resource: resource.data,\n              day: date.data\n            }\"\n          ></ng-template>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n\n<ng-template #defaultInfoTemplate></ng-template>\n<ng-template #defaultDayTemplate let-day=\"day\">{{ day.day | date: 'shortDate' }}</ng-template>\n<ng-template #defaultResourceTemplate let-resource=\"resource\">{{\n  resource.resourceNumber\n}}</ng-template>\n<ng-template #defaultHourTemplate let-slot=\"slot\">{{ slot.time | date: 'shortTime' }}</ng-template>\n<ng-template #defaultCurrentTimeTemplate let-day=\"day\"></ng-template>\n<ng-template #defaultEventTemplate let-event=\"event\">{{\n  event.resourceNumber\n}}</ng-template>\n<ng-template #defaultSlotTemplate let-slot=\"slot\">{{ slot.time | date: 'shortTime' }}</ng-template>\n  ",
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        styles: ["\n.header {\n  flex-direction: row;\n  box-sizing: border-box;\n  display: flex;\n  place-content: stretch flex-start;\n  align-items: stretch;\n}\n\n.calendar {\n  flex-direction: row;\n  box-sizing: border-box;\n  display: flex;\n  place-content: stretch flex-start;\n  align-items: stretch;\n}\n\n.resources {\n  flex-direction: row;\n  box-sizing: border-box;\n  display: flex;\n  place-content: stretch flex-start;\n  align-items: stretch;\n}\n\n.resource {\n  flex: 1 1 100%;\n  position: relative;\n  box-sizing: border-box;\n}\n\n.hour-sub-slot {\n  display: flex;\n  align-items: center;\n  justify-content: flex-end;\n}\n\n.hour-row {\n  width: 10%;\n  min-width: 50px;\n}\n\n.day-row {\n  position: relative;\n  width: 90%;\n}\n\n.event {\n  position: absolute;\n  z-index: 1;\n  width: 100%;\n  overflow: hidden;\n}\n  "]
                    }] }
        ];
        ResourceCalendarComponent.propDecorators = {
            dates: [{ type: core.Input }],
            events: [{ type: core.Input }],
            slotDurationInMinutes: [{ type: core.Input }],
            height: [{ type: core.Input }],
            hourBorderHeight: [{ type: core.Input }],
            infoTemplate: [{ type: core.Input }],
            dayTemplate: [{ type: core.Input }],
            resourceTemplate: [{ type: core.Input }],
            hourTemplate: [{ type: core.Input }],
            eventTemplate: [{ type: core.Input }],
            slotTemplate: [{ type: core.Input }],
            currentTimeTemplate: [{ type: core.Input }]
        };
        return ResourceCalendarComponent;
    }());
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
    var NgxResourceCalendarModule = /** @class */ (function () {
        function NgxResourceCalendarModule() {
        }
        NgxResourceCalendarModule.decorators = [
            { type: core.NgModule, args: [{
                        declarations: [ResourceCalendarComponent],
                        imports: [
                            common.CommonModule
                        ],
                        exports: [ResourceCalendarComponent]
                    },] }
        ];
        return NgxResourceCalendarModule;
    }());

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/models/day.model.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var DayModel = /** @class */ (function () {
        function DayModel() {
        }
        return DayModel;
    }());
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
    var EventModel = /** @class */ (function () {
        function EventModel() {
        }
        return EventModel;
    }());
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
    var HourModel = /** @class */ (function () {
        function HourModel() {
        }
        return HourModel;
    }());
    if (false) {
        /** @type {?} */
        HourModel.prototype.slots;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/models/resource.model.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var ResourceModel = /** @class */ (function () {
        function ResourceModel() {
        }
        return ResourceModel;
    }());
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
    var SlotModel = /** @class */ (function () {
        function SlotModel() {
        }
        return SlotModel;
    }());
    if (false) {
        /** @type {?} */
        SlotModel.prototype.time;
    }

    exports.DayModel = DayModel;
    exports.EventModel = EventModel;
    exports.HourModel = HourModel;
    exports.NgxResourceCalendarModule = NgxResourceCalendarModule;
    exports.ResourceCalendarComponent = ResourceCalendarComponent;
    exports.ResourceModel = ResourceModel;
    exports.SlotModel = SlotModel;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=protacon-ngx-resource-calendar.umd.js.map
