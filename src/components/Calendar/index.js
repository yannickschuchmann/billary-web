import React, { Component, PropTypes } from 'react';
import ui from 'redux-ui';
import {createCalendar, moment} from '../../businessLogic/calendarHelper';
import Week from './_week';
import ArrowLeft from 'material-ui/lib/svg-icons/hardware/keyboard-arrow-left';
import ArrowRight from 'material-ui/lib/svg-icons/hardware/keyboard-arrow-right';
import IconButton from 'material-ui/lib/icon-button';

class Calendar extends Component {
  static propTypes = {
    ui: PropTypes.object,
    updateUI: PropTypes.func
  };

  previousMonth(e) {
    this.props.updateUI("moment", this.props.ui.moment.clone().subtract(1, "months"));
  };

  nextMonth(e) {
    this.props.updateUI("moment", this.props.ui.moment.clone().add(1, "months"));
  };

  render() {
    const date = this.props.ui.moment;
    const weeksData = createCalendar(date.year(), date.month());
    const weeks = weeksData.map((days, i) => {
      return (<Week key={i} days={days}/>)
    });
    const weekHeader = (
      <div className="week">{
        weeksData[0].map((day, i) => {
          return (<div key={i} className="day">{day.moment.format('dd')}</div>)
        })
      }</div>);

    return (
      <div className="calendar">
        <div className="date-info-bar">
          <IconButton onClick={this.previousMonth.bind(this)}>
            <ArrowLeft/>
          </IconButton>
          <div className="date-info">
            <div className="month-info">
              {date.format("MMMM")}
            </div>
            <div className="year-info">
              {date.format("YYYY")}
            </div>
          </div>
          <IconButton onClick={this.nextMonth.bind(this)}>
            <ArrowRight/>
          </IconButton>
        </div>
        {weekHeader}
        {weeks}
      </div>
    )
  }
}

export default ui({
  state: {
    moment: moment(new Date())
  }
})(Calendar)
