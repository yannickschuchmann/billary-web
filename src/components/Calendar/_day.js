import React, {Component, PropTypes} from 'react';
import ui from 'redux-ui';

class Day extends Component {
  static propTypes = {
    item: PropTypes.object
  }
  render() {
    return (
      <div className="day">
        {new Date(this.props.item.date).getDate()}
      </div>
    )
  }
}

export default ui({
  state: {}
})(Day)
