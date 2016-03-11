import React, {Component, PropTypes} from 'react';
import IconButton from 'material-ui/lib/icon-button';
import Play from 'material-ui/lib/svg-icons/av/play-arrow';

class TrackingControls extends Component {
  static propTypes = {
    duration: PropTypes.number
  }
  render() {
    return (
      <IconButton>
        <Play/>
      </IconButton>
    )
  }
}

export default TrackingControls
