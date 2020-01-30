# NgxResourceCalendar

## What is this?

Resource calendar for Angular 8+

## Install
### Step 1: Install @protacon/ngx-resource-calendar
```bash
$ npm install --save @protacon/ngx-resource-calendar
```

### Step 2: Import the module
Add `NgxResourceCalendarModule` as an import in your app's root NgModule.
```typescript
import { NgxResourceCalendarModule }  from '@protacon/ngx-resource-calendar';

@NgModule({
  ...
  imports: [
    ...
    NgxResourceCalendarModule,
  ],
  ...
})
export class AppModule { }
```

## Usage
Simple usage example
```html
<pro-resource-calendar [dates]="dates" [events]="events">
</pro-resource-calendar>
```

| Attribute | Description |
| --- | --- |
| `dates` | Specifies the dates and resources which calendar shows |
| `events` | Events to show in calendar |

## License
[The MIT License (MIT)](LICENSE)

Copyright (c) 2020 Protacon