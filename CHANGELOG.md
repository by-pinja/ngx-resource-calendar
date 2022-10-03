# Changelog

### [14.0.0](https://github.com/by-pinja/ngx-resource-calendar/compare/0.0.4...14.0.0) (20xx-xx-xx)

### ⚠ BREAKING CHANGES

- Angular 14 or higher is now required to use this package
- Component is renamed from ptc-resource-calendar to pinja-resource-calendar
- `startHour` and `endHour` are required
- `hourBorderHeight` was removed
- `ResourceModel` has just array of slots as `SlotModel` and `SlotModel` requires `startTime` and `endTime` properties instead of `time` property.

### Features

- Slots can have different duration and they don't need to start on the hour

## 0.0.4 (2020-03-06)

_Initial release_
