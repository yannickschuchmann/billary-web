import React, {PropTypes} from 'react';

const TimeEntryListing = ({children}) => {
  return (
    <div className="time-entry-listing">{children}</div>
  )
}

TimeEntryListing.propTypes = {
  children: PropTypes.node
}

export default TimeEntryListing
