import React, {Component, PropTypes} from 'react';
import ui from 'redux-ui';
import objectAssign from 'object-assign';
import {moment} from '../../businessLogic/calendarHelper';
import {hourScale, minuteInPx} from './index';

class VisualDayItem extends Component {
  static propTypes = {
    index: PropTypes.number,
    item: PropTypes.object,
    width: PropTypes.number,
    x: PropTypes.number,
    ui: PropTypes.object,
    updateUI: PropTypes.func
  };

  static defaultProps = {
    width: 0,
    x: 0
  }

  render() {
    return (
      <div className="visual-day-item" style={{
          width: `${this.props.width}px`,
          transform: `translate3d(${this.props.x}px,0,0)`
        }}>
        <span>{this.props.item.projectNames.join(" - ")}</span>
      </div>
    );
  };
}

export default ui({
})(VisualDayItem);
