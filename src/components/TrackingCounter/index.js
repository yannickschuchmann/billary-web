import React, {Component, PropTypes} from 'react';
import ui from 'redux-ui';
import Tock from 'tocktimer';

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
    const hours   = Math.floor(time / 3600);
    const minutes = Math.floor((time - (hours * 3600)) / 60);
    const seconds = time - (hours * 3600) - (minutes * 60);

    const prefix = "0";
    const hours_s = hours < 10 ? prefix + hours : "" + hours;
    const minutes_s = minutes < 10 ? prefix + minutes : "" + minutes;
    const seconds_s = seconds < 10 ? prefix + seconds : "" + seconds;


    return (
      <div className="tracking-counter">
        {hours_s}:{minutes_s}:{seconds_s}
      </div>
    )
  };
}

export default ui({
  state: {
    time: -1
  }
})(TrackingCounter)
