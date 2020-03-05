import { Component, OnInit } from '@angular/core';
import {
  DayModel,
  EventModel
} from 'projects/ngx-resource-calendar/src/public-api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
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
            hours: [
              {
                slots: [
                  {
                    time: new Date('2020-01-30 12:00:00')
                  },
                  {
                    time: new Date('2020-01-30 12:15:00')
                  },
                  {
                    time: new Date('2020-01-30 12:30:00')
                  },
                  {
                    time: new Date('2020-01-30 12:45:00')
                  }
                ]
              },
              {
                slots: [
                  {
                    time: new Date('2020-01-30 13:00:00')
                  },
                  {
                    time: new Date('2020-01-30 13:15:00')
                  },
                  {
                    time: new Date('2020-01-30 13:30:00')
                  },
                  {
                    time: new Date('2020-01-30 13:45:00')
                  }
                ]
              }
            ]
          },
          {
            resourceNumber: 2,
            hours: [
              {
                slots: [
                  {
                    time: new Date('2020-01-30 12:00:00')
                  },
                  {
                    time: new Date('2020-01-30 12:15:00')
                  },
                  {
                    time: new Date('2020-01-30 12:30:00')
                  },
                  {
                    time: new Date('2020-01-30 12:45:00')
                  }
                ]
              },
              {
                slots: [
                  {
                    time: new Date('2020-01-30 13:00:00')
                  },
                  {
                    time: new Date('2020-01-30 13:15:00')
                  },
                  {
                    time: new Date('2020-01-30 13:30:00')
                  },
                  {
                    time: new Date('2020-01-30 13:45:00')
                  }
                ]
              }
            ]
          }
        ]
      }
    ];
  }

  public setDays() {
    this.setDay();

    this.dates.push({
      day: new Date('2020-01-31 00:00:00'),
      resources: [
        {
          resourceNumber: 1,
          hours: [
            {
              slots: [
                {
                  time: new Date('2020-01-31 12:00:00')
                },
                {
                  time: new Date('2020-01-31 12:15:00')
                },
                {
                  time: new Date('2020-01-31 12:30:00')
                },
                {
                  time: new Date('2020-01-31 12:45:00')
                }
              ]
            },
            {
              slots: [
                {
                  time: new Date('2020-01-31 13:00:00')
                },
                {
                  time: new Date('2020-01-31 13:15:00')
                },
                {
                  time: new Date('2020-01-31 13:30:00')
                },
                {
                  time: new Date('2020-01-31 13:45:00')
                }
              ]
            }
          ]
        }
      ]
    });
  }

  public addEvents() {
    this.events = [
      {
        startTime: new Date('2020-01-30 12:00:00'),
        endTime: new Date('2020-01-30 12:15:00'),
        resourceNumber: 1
      },
      {
        startTime: new Date('2020-01-30 12:30:00'),
        endTime: new Date('2020-01-30 13:15:00'),
        resourceNumber: 1,
        left: 0,
        width: 50
      },
      {
        startTime: new Date('2020-01-30 12:30:00'),
        endTime: new Date('2020-01-30 13:15:00'),
        resourceNumber: 1,
        left: 50,
        width: 50
      }
    ];
  }
}
