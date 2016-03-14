import React, {PropTypes} from 'react';

const TimeEntry = ({item, index}) => {
  return (
    <div className="time-entry">
      <div className="id">{index}</div>
      <div className="name">{item.project_id}</div>
      <div className="duration">{item.duration}</div>
    </div>
  )
}

TimeEntry.propTypes = {
  item: PropTypes.object,
  index: PropTypes.number
}

export default TimeEntry
