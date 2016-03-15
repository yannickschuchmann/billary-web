import React, {Component, PropTypes} from 'react';
import IconButton from 'material-ui/lib/icon-button';
import Play from 'material-ui/lib/svg-icons/av/play-arrow';
import Stop from 'material-ui/lib/svg-icons/av/stop';

class TrackingControls extends Component {
  static propTypes = {
    running: PropTypes.bool,
    onStart: PropTypes.func,
    onStop: PropTypes.func
  }
  render() {
    return (
      <div className="tracking-controls">
        <IconButton
          onClick={this.props.running ? this.props.onStop : this.props.onStart}>
          {this.props.running ? <Stop color="#fff" /> : <Play color="#fff" />}
        </IconButton>
      </div>
    )
  }
}

export default TrackingControls
