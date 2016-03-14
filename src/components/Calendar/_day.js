import React, {Component, PropTypes} from 'react';
import ui from 'redux-ui';

class Day extends Component {
  static propTypes = {
    item: PropTypes.object
  }
  render() {
    return (
      <div className="day">
        {this.props.item.moment.dates()}
      </div>
    )
  }
}

export default ui({
  state: {}
})(Day)
