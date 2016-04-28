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
    updateUI: PropTypes.func,
    timeEntriesByDay: PropTypes.object,
    selectedDay: PropTypes.object,
    onSelectDay: PropTypes.func
  };

  previousMonth(e) {
    this.props.updateUI("selectedMonth", this.props.ui.selectedMonth.clone().subtract(1, "months"));
  };

  nextMonth(e) {
    this.props.updateUI("selectedMonth", this.props.ui.selectedMonth.clone().add(1, "months"));
  };

  componentWillMount() {
    this.props.updateUI("selectedMonth", moment(this.props.selectedDay));
  };

  componentReceiveProps(newProps) {
    newProps.updateUI("selectedMonth", moment(newProps.selectedDay));
  };


  render() {
    const date = this.props.ui.selectedMonth;
    const weeksData = createCalendar(date.year(), date.month(), this.props.timeEntriesByDay);
    const weeks = weeksData.map((days, i) => {
      return (<Week selectedDay={this.props.selectedDay} onSelectDay={this.props.onSelectDay} key={i} days={days}/>)
    });
    const weekHeader = (
      <div className="week week-header">{
        weeksData[0].map((day, i) => {
          return (<div key={i} className="day">{day.moment.format('dd')}</div>)
        })
      }</div>);

    return (
      <div className="calendar">
        <div className="date-info-bar">
          <IconButton style={{
              height: 24,
              width: 24,
              padding: 0
            }} onClick={this.previousMonth.bind(this)}>
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
          <IconButton style={{
              height: 24,
              width: 24,
              padding: 0
            }} onClick={this.nextMonth.bind(this)}>
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
    selectedMonth: moment()
  }
})(Calendar)
