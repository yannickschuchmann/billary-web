import React, {Component, PropTypes} from 'react';
import ui from 'redux-ui';

class VisualDayRow extends Component {
  static propTypes = {
    children: PropTypes.node
  };

  render() {
    return (
      <div className="visual-day-row">
        {this.props.children}
      </div>
    );
  };
}


export default ui({state: {}})(VisualDayRow);
