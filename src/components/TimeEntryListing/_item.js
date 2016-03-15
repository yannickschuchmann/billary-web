import React, {PropTypes} from 'react';
import {
  moment,
  secondsToCounterString,
  minutesToCounterString
} from '../../businessLogic/calendarHelper';
import ArrowForward from 'material-ui/lib/svg-icons/navigation/arrow-forward';
import Timer from 'material-ui/lib/svg-icons/image/timer';
import IconMenu from 'material-ui/lib/menus/icon-menu';
import MenuItem from 'material-ui/lib/menus/menu-item';
import IconButton from 'material-ui/lib/icon-button';
import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert';

const TimeEntry = ({item, index, onEdit, onDelete}) => {
  const names = item.projectNames.map((name, i) => {
    return (
      <span className="name-item" key={i}>
        {name}
        {i != item.projectNames.length - 1 ? <ArrowForward/> : ""}
      </span>
    )
  });

  const handleClick = (fn, e) => {
    e.stopPropagation();
    fn();
  };

  return (
    <div className="time-entry">
      <div className="id">{index}</div>
      <div className="name">{names}</div>
      {(item.stopped_at) ?
        <div className="duration">
          <Timer />{minutesToCounterString(item.duration)}
        </div> :
        <div className="duration">running</div>
      }
      <IconMenu
        className="actions-button"
        iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
        targetOrigin={{horizontal: 'right', vertical: 'top'}}
        useLayerForClickAway={true}
      >
        <MenuItem
          primaryText="Edit"
          onClick={(e) => handleClick(onEdit, e)} />
        <MenuItem
          primaryText="Delete"
          onClick={(e) => handleClick(onDelete, e)} />
      </IconMenu>
    </div>
  )
}

TimeEntry.propTypes = {
  item: PropTypes.object,
  index: PropTypes.number,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func
}

export default TimeEntry
