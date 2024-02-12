import { Component, OnInit } from '@angular/core';
import {
  DayModel,
  EventModel,
} from 'projects/ngx-resource-calendar/src/public-api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  public dates: DayModel[] = [];
  public events: EventModel[] = [];
  public startHour = 12;
  public endHour = 14;
  public scenarios = [
    {
      name: 'Two days',
      method: () => this.setDays(),
    },
    {
      name: 'Add events',
      method: () => this.addEvents(),
    },
    {
      name: 'Winter to summer (EET->EEST)',
      method: () => this.setWinter2summer(false),
    },
    {
      name: 'Summer to winter (EEST->EET)',
      method: () => this.setSummer2winter(false),
    },
    {
      name: 'Winter to summer (1 day) (EET->EEST)',
      method: () => this.setWinter2summer(true),
    },
    {
      name: 'Summer to winter (1 day) (EEST->EET)',
      method: () => this.setSummer2winter(true),
    },
  ];

  public ngOnInit() {
    this.setDay();
  }

  public setWinter2summer(singleDay: boolean) {
    this.startHour = 0;
    this.endHour = 23;
    let dayCount = 1;

    // DST activates in last sunday of March.
    const targetDate = this.getLastSunday(2);

    if (!singleDay) {
      dayCount = 3;
      targetDate.setDate(targetDate.getDate() - 1);
    }

    this.dates = [...this.generateDays(targetDate, dayCount)];
  }

  public setSummer2winter(singleDay: boolean) {
    this.startHour = 0;
    this.endHour = 23;
    let dayCount = 1;

    // DST activates in last sunday of March.
    const targetDate = this.getLastSunday(9);

    if (!singleDay) {
      dayCount = 3;
      targetDate.setDate(targetDate.getDate() - 1);
    }

    this.dates = [...this.generateDays(targetDate, dayCount)];
  }

  /**
   * Generates days with slots, starting from targetDate.
   * @param targetDate
   * @param dayCount
   * @private
   */
  private generateDays(targetDate: Date, dayCount: number) {
    const dates = [];

    for (let i = 0; i < dayCount; i++) {
      const date = new Date(targetDate);
      date.setDate(date.getDate() + i);

      dates.push({
        day: date,
        resources: [
          {
            resourceNumber: 1,
            slots: [...this.generateSlots(date)],
          },
        ],
      });
    }

    return dates;
  }

  /**
   * Generates slots for the date.
   * @param date
   * @private
   */
  private generateSlots(date: Date): any[] {
    const slots = [];
    let currentDate = new Date(date.getTime());

    while (currentDate.getDay() === date.getDay()) {
      const startTime = new Date(currentDate.getTime());
      const endTime = new Date(currentDate.getTime());
      endTime.setMinutes(endTime.getMinutes() + 15);

      const slot = { startTime, endTime };
      slots.push(slot);

      currentDate.setMinutes(currentDate.getMinutes() + 15);
    }

    return slots;
}

  /**
   * Converts date to timezone time.
   * @param date
   * @param timeZone
   */
  public convertTimeToTimezone(date: Date, timeZone: string): string {
    const options: Intl.DateTimeFormatOptions = {
      timeZone,
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    };
    const formatter = new Intl.DateTimeFormat(['fi'], options);
    return formatter.format(date);
  }

  /**
   * Converts date to timezone date.
   * @param date
   * @param timeZone
   */
  public convertDayToTimezone(date: Date, timeZone: string): string {
    const options: Intl.DateTimeFormatOptions = {
      timeZone,
      month: 'numeric',
      day: 'numeric',
    };
    const formatter = new Intl.DateTimeFormat(['fi'], options);
    return formatter.format(date);
  }

  public setDay() {
    this.startHour = 11;
    this.endHour = 15;

    this.dates = [
      {
        day: new Date('2020-01-30 00:00:00'),
        resources: [
          {
            resourceNumber: 1,
            slots: [
              {
                startTime: new Date('2020-01-30 12:00:00'),
                endTime: new Date('2020-01-30 12:15:00'),
              },
              {
                startTime: new Date('2020-01-30 12:15:00'),
                endTime: new Date('2020-01-30 12:30:00'),
              },
              {
                startTime: new Date('2020-01-30 12:30:00'),
                endTime: new Date('2020-01-30 12:45:00'),
              },
              {
                startTime: new Date('2020-01-30 12:45:00'),
                endTime: new Date('2020-01-30 13:00:00'),
              },
              {
                startTime: new Date('2020-01-30 13:00:00'),
                endTime: new Date('2020-01-30 13:15:00'),
              },
              {
                startTime: new Date('2020-01-30 13:15:00'),
                endTime: new Date('2020-01-30 13:30:00'),
              },
              {
                startTime: new Date('2020-01-30 13:30:00'),
                endTime: new Date('2020-01-30 13:45:00'),
              },
              {
                startTime: new Date('2020-01-30 13:45:00'),
                endTime: new Date('2020-01-30 14:00:00'),
              },
              {
                startTime: new Date('2020-01-30 14:20:00'),
                endTime: new Date('2020-01-30 14:40:00'),
              },
              {
                startTime: new Date('2020-01-30 14:40:00'),
                endTime: new Date('2020-01-30 15:00:00'),
              },
            ],
          },
          {
            resourceNumber: 2,
            slots: [
              {
                startTime: new Date('2020-01-30 12:05:00'),
                endTime: new Date('2020-01-30 12:20:00'),
              },
              {
                startTime: new Date('2020-01-30 12:20:00'),
                endTime: new Date('2020-01-30 12:35:00'),
              },
              {
                startTime: new Date('2020-01-30 12:35:00'),
                endTime: new Date('2020-01-30 12:50:00'),
              },
              {
                startTime: new Date('2020-01-30 12:50:00'),
                endTime: new Date('2020-01-30 13:05:00'),
              },
              {
                startTime: new Date('2020-01-30 13:05:00'),
                endTime: new Date('2020-01-30 13:20:00'),
              },
              {
                startTime: new Date('2020-01-30 13:20:00'),
                endTime: new Date('2020-01-30 13:35:00'),
              },
              {
                startTime: new Date('2020-01-30 13:35:00'),
                endTime: new Date('2020-01-30 13:50:00'),
              },
              {
                startTime: new Date('2020-01-30 13:50:00'),
                endTime: new Date('2020-01-30 14:05:00'),
              },
              {
                startTime: new Date('2020-01-30 14:45:00'),
                endTime: new Date('2020-01-30 15:00:00'),
              },
            ],
          },
        ],
      },
    ];
  }

  public setDays() {
    this.startHour = 11;
    this.endHour = 15;
    this.setDay();

    this.dates.push({
      day: new Date('2020-01-31 00:00:00'),
      resources: [
        {
          resourceNumber: 1,
          slots: [
            {
              startTime: new Date('2020-01-31 12:00:00'),
              endTime: new Date('2020-01-31 12:15:00'),
            },
            {
              startTime: new Date('2020-01-31 12:15:00'),
              endTime: new Date('2020-01-31 12:30:00'),
            },
            {
              startTime: new Date('2020-01-31 12:30:00'),
              endTime: new Date('2020-01-31 12:45:00'),
            },
            {
              startTime: new Date('2020-01-31 12:45:00'),
              endTime: new Date('2020-01-31 13:00:00'),
            },
            {
              startTime: new Date('2020-01-31 13:00:00'),
              endTime: new Date('2020-01-31 13:15:00'),
            },
            {
              startTime: new Date('2020-01-31 13:15:00'),
              endTime: new Date('2020-01-31 13:30:00'),
            },
            {
              startTime: new Date('2020-01-31 13:30:00'),
              endTime: new Date('2020-01-31 13:45:00'),
            },
            {
              startTime: new Date('2020-01-31 13:45:00'),
              endTime: new Date('2020-01-31 14:00:00'),
            },
          ],
        },
      ],
    });
  }

  public addEvents() {
    this.events = [
      {
        startTime: new Date('2020-01-30 12:00:00'),
        endTime: new Date('2020-01-30 12:15:00'),
        resourceNumber: 1,
      },
      {
        startTime: new Date('2020-01-30 12:20:00'),
        endTime: new Date('2020-01-30 12:35:00'),
        resourceNumber: 2,
        left: '10px',
        width: '100px',
      },
      {
        startTime: new Date('2020-01-30 12:30:00'),
        endTime: new Date('2020-01-30 13:15:00'),
        resourceNumber: 1,
        left: '0',
        width: '50%',
      },
      {
        startTime: new Date('2020-01-30 12:30:00'),
        endTime: new Date('2020-01-30 13:15:00'),
        resourceNumber: 1,
        left: '50%',
        width: '50%',
      },
      {
        startTime: new Date('2020-01-30 13:45:00'),
        endTime: new Date('2020-01-30 14:00:00'),
        resourceNumber: 1,
      },
    ];
  }

  /**
   * Calculates the last sunday for given month.
   * Please note that the months are zero-based, January being 0.
   * @param month Target month
   * @private
   */
  private getLastSunday(month): Date {
    const now = new Date();

    // Create a Date object for the first day of the next month
    const firstDayOfNextMonth = new Date(now.getFullYear(), month + 1, 1);

    // Set the date to the last day of the current month
    const lastDayOfCurrentMonth = new Date(firstDayOfNextMonth.getTime() - 1);

    // Calculate the difference in days between the last day and its day of the week
    const dayOfWeek = lastDayOfCurrentMonth.getDay();
    const daysUntilLastSunday = (dayOfWeek + 7) % 7;

    // Calculate the date of the last Sunday by subtracting the days until the last Sunday
    const lastSunday = new Date(lastDayOfCurrentMonth);
    lastSunday.setDate(lastSunday.getDate() - daysUntilLastSunday);

    // Set time component to 00:00:00.000
    lastSunday.setHours(0);
    lastSunday.setMinutes(0);
    lastSunday.setSeconds(0);
    lastSunday.setMilliseconds(0);

    return lastSunday;
  }
}
