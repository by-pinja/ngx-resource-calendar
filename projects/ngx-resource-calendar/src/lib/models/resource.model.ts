import { SlotModel } from './slot.model';
import { CalendarEventModel } from './calendar-event.model';

export class ResourceModel {
  resourceNumber: number | string;
  slots: SlotModel[] | CalendarEventModel<SlotModel>[];
}
