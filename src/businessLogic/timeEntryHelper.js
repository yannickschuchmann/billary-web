import {moment} from './calendarHelper';

const getStartedAtWithOverhang = (item) => {
  if (item.daysOverhang > 0 && item.currentDayOverhang > 0) {
    return moment(new Date(item.groupDate)).startOf('day');
  } else {
    return moment(new Date(item.started_at));
  }
};
const getStoppedAtWithOverhang = (item) => {
  if (item.daysOverhang && item.currentDayOverhang < item.daysOverhang) {
    return moment(new Date(item.groupDate)).startOf('day').add(1, 'day');
  } else {
    return moment(new Date(item.stopped_at));
  }
}

const getDurationWithOverhang = (item) => {
  return getStoppedAtWithOverhang(item)
          .diff(getStartedAtWithOverhang(item), 'minutes');
}

export {
  getStartedAtWithOverhang,
  getStoppedAtWithOverhang,
  getDurationWithOverhang
}
