import React, {PropTypes} from 'react';
import {
  moment,
  secondsToCounterString,
  minutesToCounterString
} from '../../businessLogic/calendarHelper';
import ArrowForward from 'material-ui/lib/svg-icons/navigation/arrow-forward';

const TimeEntry = ({item, index}) => {
  const names = item.projectNames.map((name, i) => {
    return (
      <span className="name-item" key={i}>
        {name}
        {i != item.projectNames.length - 1 ? <ArrowForward/> : ""}
      </span>
    )
  })
  return (
    <div className="time-entry">
      <div className="id">{index}</div>
      <div className="name">{names}</div>
      <div className="duration">{minutesToCounterString(item.duration)}</div>
    </div>
  )
}

TimeEntry.propTypes = {
  item: PropTypes.object,
  index: PropTypes.number
}

export default TimeEntry
