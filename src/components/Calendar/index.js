import React, { Component, PropTypes } from 'react';
import ui from 'redux-ui';
import createCalendar from '../../businessLogic/calendarHelper';
import Week from './_week';

class Calendar extends Component {
  static propTypes = {
    ui: PropTypes.object,
    updateUI: PropTypes.func
  };


  render() {
    const weeks = createCalendar(this.props.ui.year, this.props.ui.month).map((days, i) => {
      return (<Week key={i} days={days}/>)
    });
    return (
      <div className="calendar">
        <div className="week headline">
          <div className="day">Mo</div>
          <div className="day">Di</div>
          <div className="day">Mi</div>
          <div className="day">Do</div>
          <div className="day">Fr</div>
          <div className="day">Sa</div>
          <div className="day">So</div>
        </div>
        {weeks}</div>
    )
  }
}

export default ui({
  state: {
    year: new Date().getFullYear(),
    month: new Date().getMonth()
  }
})(Calendar)
