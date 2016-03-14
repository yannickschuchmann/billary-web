import React, {PropTypes} from 'react';
import Day from './_day';
import {moment} from '../../businessLogic/calendarHelper';

const Week = ({days, onSelectDay, selectedDay}) => {
  const dayElements = days.map((day, i) => {
    return (
      <Day
        isSelected={moment(selectedDay).isSame(day.moment, 'day')}
        onSelectDay={onSelectDay}
        key={i}
        item={day} />
    )
  });
  return (
    <div className="week">
      {dayElements}
    </div>
  )
}

Week.propTypes = {
  days: PropTypes.array.isRequired,
  onSelectDay: PropTypes.func,
  selectedDay: PropTypes.object
}

export default Week;
