import React, {Component, PropTypes} from 'react';
import IconButton from 'material-ui/lib/icon-button';
import Play from 'material-ui/lib/svg-icons/av/play-arrow';
import Pause from 'material-ui/lib/svg-icons/av/pause';

class TrackingControls extends Component {
  static propTypes = {
    running: PropTypes.bool,
    onStart: PropTypes.func,
    onStop: PropTypes.func
  }
  render() {
    return (
      <IconButton
        onClick={this.props.running ? this.props.onStop : this.props.onStart}>
        {this.props.running ? <Pause/> : <Play/>}
      </IconButton>
    )
  }
}

export default TrackingControls
