import React, {Component, PropTypes} from 'react';
import ui from 'redux-ui';
import FlatButton from 'material-ui/lib/flat-button';
import ArrowForward from 'material-ui/lib/svg-icons/navigation/arrow-forward';
import TimerIcon from 'material-ui/lib/svg-icons/image/timer';
import PlayIcon from 'material-ui/lib/svg-icons/av/play-arrow';
import StopIcon from 'material-ui/lib/svg-icons/av/stop';

import { IconButton } from 'material-ui/lib';
import {
  moment,
  secondsToCounterString,
  minutesToCounterString
} from '../../businessLogic/calendarHelper';

class ProjectWrap extends Component {
  static propTypes = {
    children: PropTypes.node,
    duration: PropTypes.number,
    index: PropTypes.number,
    isRunning: PropTypes.bool,
    open: PropTypes.bool,
    project: PropTypes.object,
    ui: PropTypes.object,
    updateUI: PropTypes.func
  }

  render() {
    const { project: item, isRunning } = this.props;
    const children = this.props.open ? (
      <div className="project-wrap-children">
        {this.props.children}
      </div>
    ) : "";
    const names = item.projectNames.map((name, i) => {
      return (
        <span className="name-item" key={i}>
          {name}
          {i != item.projectNames.length - 1 ? <ArrowForward/> : ""}
        </span>
      )
    });

    return (
      <div className="project-wrap">
        <div className="project-wrap-item">
          <IconButton onClick={(e) => {
              e.stopPropagation();
              if (isRunning) {
                this.props.onStop();
              } else {
                this.props.onSelectAndStart(item.id);
              }
            }}>
            {isRunning ? <StopIcon/> : <PlayIcon/>}
          </IconButton>
          <div className="color-identifier"></div>
          <FlatButton
            onClick={this.props.onToggle}
            fullWidth={true}
            style={{
              width: "100%",
              textAlign: "left"
            }}>
            <div className="index">{this.props.index}</div>
            <div className="name">{names}</div>
            <div className="duration"><TimerIcon />{minutesToCounterString(this.props.duration)}</div>

          </FlatButton>
        </div>
        {children}
      </div>
    )
  }
}

export default ui({
  state: {
  }
})(ProjectWrap);
