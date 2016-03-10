import React, {Component, PropTypes} from 'react';
import ui from 'redux-ui';

class TrackingBar extends Component {
  static propTypes = {
    ui: PropTypes.object,
    updateUi: PropTypes.func,
    project: PropTypes.object
  };

  render () {
    return (
      <div className="tracking-bar">
        {this.props.ui.isSelecting + ""}
        {(this.props.project) ? this.props.project.name : ""}
      </div>
    )
  }
}

export default ui({
  state: {
    isSelecting: false
  }
})(TrackingBar);
