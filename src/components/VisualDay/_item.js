import React, {Component, PropTypes} from 'react';
import ui from 'redux-ui';
import objectAssign from 'object-assign';
import {moment} from '../../businessLogic/calendarHelper';
import {hourScale} from './index';
class VisualDayItem extends Component {
  static propTypes = {
    index: PropTypes.number,
    item: PropTypes.object,
    ui: PropTypes.object,
    updateUI: PropTypes.func
  };

  static minuteInPx = hourScale / 60;

  getX() {
    const startedAt = this.props.item.started_at_overhang.clone();
    return startedAt.diff(startedAt
                            .clone()
                            .startOf('day'), 'minute')
                            * VisualDayItem.minuteInPx;
  };

  getWidth() {
    const item = this.props.item;
    return Math.abs(item.stopped_at_overhang
                      .clone()
                      .diff(item.started_at_overhang, 'minute')) * VisualDayItem.minuteInPx;
  };

  componentWillMount() {
    this.props.updateUI("itemStyle", objectAssign({}, this.props.ui.itemStyle, {
      transform: `translateX(${this.getX()}px)`,
      width: `${this.getWidth()}px`
    }));
  };

  render() {
    return (
      <div className="visual-day-item" style={this.props.ui.itemStyle}>
        {this.props.item.projectNames.join(" - ")}
      </div>
    );
  };
}


export default ui({
  state: {
    itemStyle: {
      transform: "translateX(0)",
      width: 0
    }
  }
})(VisualDayItem);
