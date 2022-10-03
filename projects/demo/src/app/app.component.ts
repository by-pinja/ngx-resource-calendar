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

  public ngOnInit() {
    this.setDay();
  }

  public setDay() {
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
}
