import React, {PropTypes} from 'react';
import {
  moment,
  secondsToCounterString,
  minutesToCounterString
} from '../../businessLogic/calendarHelper';
import {
  getStartedAtWithOverhang,
  getStoppedAtWithOverhang
} from '../../businessLogic/timeEntryHelper';
import Timer from 'material-ui/lib/svg-icons/image/timer';
import TimerOff from 'material-ui/lib/svg-icons/image/timer-off';
import IconMenu from 'material-ui/lib/menus/icon-menu';
import MenuItem from 'material-ui/lib/menus/menu-item';
import IconButton from 'material-ui/lib/icon-button';
import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert';

const TimeEntry = ({item, index, onEdit, onDelete}) => {
  const handleClick = (fn, e) => {
    e.stopPropagation();
    fn();
  };

  let startedAt = "", startedAtIcon = "";
  if (item.started_at) {
    startedAt = getStartedAtWithOverhang(item).format("HH:mm");
    startedAtIcon = <Timer/>
  }

  let stoppedAt = "", stoppedAtIcon = "";
  if (item.stopped_at) {
    stoppedAt = getStoppedAtWithOverhang(item).format("HH:mm");
    stoppedAtIcon = <TimerOff/>
  }

  return (
    <div className="time-entry">
      <div className="index">{index}</div>
      <div className="dates-wrap">
        <div className="date">{startedAt}{startedAtIcon}</div>
        <div className="date">{stoppedAt}{stoppedAtIcon}</div>
      </div>
      <div className="duration">
        {(item.stopped_at) ?
          minutesToCounterString(item.duration) :
          "running"
        }
      </div>
      <IconMenu
        className="actions-button"
        iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
        targetOrigin={{horizontal: 'right', vertical: 'top'}}
        useLayerForClickAway={true}>
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
