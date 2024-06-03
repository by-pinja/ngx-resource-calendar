import { ResourceModel } from './resource.model';
import { CalendarEventModel } from './calendar-event.model';
import { EventModel } from './event.model';

export interface InternalResourceModel extends ResourceModel {
  data: ResourceModel;
  events: CalendarEventModel<EventModel>[];
}
