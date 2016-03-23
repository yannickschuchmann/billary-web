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

  static defaultProps = {
    duration: 0
  };

  constructor(props) {
    super(props);
    this.state = {time: props.duration};
  }

  incrementTimeEntry() {
    this.setState({
      time: this.state.time + 1
    });
  };

  componentWillReceiveProps(nextProps) {
    this.setState({
      time: nextProps.duration
    });
    if (nextProps.running) {
      this.timer.start()
    } else {
      this.timer.reset();
    }
  };

  componentWillMount() {
    this.setState({
      time: this.props.duration
    });
    this.timer = new Tock({interval: 1000, callback: this.incrementTimeEntry.bind(this)})
    if (this.props.running) this.timer.start();
  };

  componentWillUnmount() {
    this.timer.reset();
  };

  render() {
    const time = this.state.time;
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
