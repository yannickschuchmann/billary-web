import React, {PropTypes} from 'react';
import Day from './_day';

const Week = ({days}) => {
  const dayElements = days.map((day, i) => {
    return (<Day key={i} item={day} />)
  });
  return (
    <div className="week">
      {dayElements}
    </div>
  )
}

Week.propTypes = {
  days: PropTypes.array.isRequired
}

export default Week;
