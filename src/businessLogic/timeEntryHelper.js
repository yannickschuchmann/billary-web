import {moment} from './calendarHelper';

const getStartedAtWithOverhang = (item) => {
  if (item.daysOverhang > 0 && item.currentDayOverhang > 0) {
    return moment(item.started_at).startOf('day');
  } else {
    return moment(item.started_at);
  }
};
const getStoppedAtWithOverhang = (item) => {
  if (item.daysOverhang && item.currentDayOverhang < item.daysOverhang) {
    return moment(item.stopped_at).startOf('day').add(1, 'day');
  } else {
    return moment(item.stopped_at);
  }
}

export {getStartedAtWithOverhang, getStoppedAtWithOverhang}
