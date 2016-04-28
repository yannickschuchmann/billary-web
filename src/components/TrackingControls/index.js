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
    const iconStyle = {
      height: 48,
      width: 48
    }
    return (
      <div className="tracking-controls">
        <IconButton
          style={{
            padding: 0
          }}
          iconStyle={iconStyle}
          onClick={this.props.running ? this.props.onStop : this.props.onStart}>
          {this.props.running ? <Stop color="#fff" /> : <Play color="#fff" />}
        </IconButton>
      </div>
    )
  }
}

export default TrackingControls
