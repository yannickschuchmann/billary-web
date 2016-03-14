import React, {Component, PropTypes} from 'react';
import ui from 'redux-ui';

class Day extends Component {
  static propTypes = {
    item: PropTypes.object,
    onSelectDay: PropTypes.func,
    isSelected: PropTypes.bool
  }
  render() {
    const day = this.props.item;
    const classNames = "day" +
      (day.today ? " is-today" : "") +
      (this.props.isSelected ? " is-selected" : "") +
      (day.containsTimeEntries ? " contains-time-entries" : "");

    return (
      <div
        onClick={(e) => this.props.onSelectDay(day)}
        className={"day " + classNames}>
        {this.props.item.moment.date()}
      </div>
    )
  }
}

export default ui({
  state: {}
})(Day)
