import { DayModel } from './day.model';
import { InternalResourceModel } from './internal-resource.model';

export interface DateWithEventsModel {
  // Target date.
  data: DayModel;

  // Date's resources.
  resources: InternalResourceModel[];
}
