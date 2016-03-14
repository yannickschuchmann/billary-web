import React, {PropTypes} from 'react';
import {moment, secondsToCounterString} from '../../businessLogic/calendarHelper';

const TimeEntry = ({item, index}) => {
  const duration = secondsToCounterString(item.duration);
  return (
    <div className="time-entry">
      <div className="id">{index}</div>
      <div className="name">{item.projectName}</div>
      <div className="duration">{duration}</div>
    </div>
  )
}

TimeEntry.propTypes = {
  item: PropTypes.object,
  index: PropTypes.number
}

export default TimeEntry
