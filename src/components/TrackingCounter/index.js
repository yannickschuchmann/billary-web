import React, {Component, PropTypes} from 'react';

class TrackingCounter extends Component {
  static propTypes = {
    duration: PropTypes.number
  }
  render() {
    const time = this.props.duration;
    const hours   = Math.floor(time / 3600);
    const minutes = Math.floor((time - (hours * 3600)) / 60);
    const seconds = time - (hours * 3600) - (minutes * 60);

    const prefix = "0"
    const hours_s = hours < 10 ? prefix + hours : "" + hours;
    const minutes_s = minutes < 10 ? prefix + minutes : "" + minutes;
    const seconds_s = seconds < 10 ? prefix + seconds : "" + seconds;
     return (
      <div className="tracking-counter">
        {hours_s}:{minutes_s}:{seconds_s}
      </div>
    )
  }
}

export default TrackingCounter
