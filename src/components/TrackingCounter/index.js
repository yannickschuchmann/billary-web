import React, {Component, PropTypes} from 'react';
import ui from 'redux-ui';
import Tock from 'tocktimer';
import {secondsToCounterString} from '../../businessLogic/calendarHelper';

class TrackingCounter extends Component {
  static propTypes = {
    ui: PropTypes.object,
    updateUI: PropTypes.func,
    duration: PropTypes.number,
    running: PropTypes.bool
  };

  incrementTimeEntry() {
    this.props.updateUI("time", this.props.ui.time + 1);
  };

  componentWillReceiveProps(nextProps) {
    nextProps.updateUI("time", nextProps.duration);
    if (nextProps.running) {
      this.timer.start()
    } else {
      this.timer.reset();
    }
  };

  componentWillMount() {
    this.props.updateUI("time", this.props.duration);
    this.timer = new Tock({interval: 1000, callback: this.incrementTimeEntry.bind(this)})
    if (this.props.running) this.timer.start();
  };

  componentWillUnmount() {
    this.timer.reset();
  };

  render() {
    const time = this.props.ui.time;


    return (
      <div className="tracking-counter">
        {secondsToCounterString(time)}
      </div>
    )
  };
}

export default ui({
  state: {
    time: -1
  }
})(TrackingCounter)
