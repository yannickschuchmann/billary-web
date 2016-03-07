import React, {PropTypes} from 'react';

const TrackingBar = ({project}) => {
  return (
    <div className="tracking-bar">
      {(project) ? project.name : ""}
    </div>
  )
}

TrackingBar.propTypes = {
  project: PropTypes.object
}

export default TrackingBar;
