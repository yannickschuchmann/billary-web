import React, {PropTypes} from 'react';
import {
  moment,
  secondsToCounterString,
  minutesToCounterString
} from '../../businessLogic/calendarHelper';

const TimeEntry = ({item, index}) => {
  return (
    <div className="time-entry">
      <div className="id">{index}</div>
      <div className="name">{item.projectName}</div>
      <div className="duration">{minutesToCounterString(item.duration)}</div>
    </div>
  )
}

TimeEntry.propTypes = {
  item: PropTypes.object,
  index: PropTypes.number
}

export default TimeEntry
