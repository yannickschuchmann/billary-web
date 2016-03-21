import React, {Component, PropTypes} from 'react';
import ui from 'redux-ui';
import objectAssign from 'object-assign';
import {moment} from '../../businessLogic/calendarHelper';

class VisualDay extends Component {
  static propTypes = {
    children: PropTypes.node,
    selectedDay: PropTypes.object
  };

  static hourScale = 100; //px
  static spacingAround = 20; //px

  render() {
    let grid = [];
    for(let i = 0; i < 24; i++) {
      grid.push(<div className="grid-line">{i}</div>);
    }

    return (
      <div className="visual-day-wrap">
        <div className="visual-day-header" style={{
            padding: this.props.ui.style.padding
          }}>
          {moment(this.props.selectedDay).format("dddd, Do MMMM YYYY")}
        </div>
        <div className="visual-day-scroll-wrap">
          <div className="visual-day-scroll">
            <div className="visual-day" ref="container" style={this.props.ui.style}>
              <div className="grid" style={{
                  left: `${VisualDay.spacingAround}px`,
                  right: `${VisualDay.spacingAround}px`
                }}>{grid}</div>
              {this.props.children}
            </div>
          </div>
        </div>
      </div>
    );
  };
}


export default ui({
  state: {
    style: {
      width: (24 * VisualDay.hourScale) + "px",
      padding: `0 ${VisualDay.spacingAround}px`
    }
  }
})(VisualDay);
