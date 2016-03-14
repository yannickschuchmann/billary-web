import React, { Component, PropTypes } from 'react';
import ui from 'redux-ui';
import {createCalendar, moment} from '../../businessLogic/calendarHelper';
import Week from './_week';


class Calendar extends Component {
  static propTypes = {
    ui: PropTypes.object,
    updateUI: PropTypes.func
  };


  render() {
    const weeksData = createCalendar(this.props.ui.year, this.props.ui.month);
    const weeks = weeksData.map((days, i) => {
      return (<Week key={i} days={days}/>)
    });
    const weekHeader = (
      <div className="week">{
        weeksData[0].map((day, i) => {
          return (<div key={i} className="day">{moment(day.date).format('dd')}</div>)
        })
      }</div>);

    return (
      <div className="calendar">
        {weekHeader}
        {weeks}
      </div>
    )
  }
}

export default ui({
  state: {
    year: new Date().getFullYear(),
    month: new Date().getMonth()
  }
})(Calendar)
