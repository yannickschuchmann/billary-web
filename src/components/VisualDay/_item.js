import React, {Component, PropTypes} from 'react';
import ui from 'redux-ui';

class VisualDayItem extends Component {
  static propTypes = {
    index: PropTypes.number,
    item: PropTypes.object
  };

  render() {
    return (
      <div className="visual-day-item">
        {this.props.item.duration}
      </div>
    );
  };
}


export default ui({state: {}})(VisualDayItem);
