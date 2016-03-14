import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ui from 'redux-ui';
import * as actions from '../actions';
import TrackingBar from '../components/TrackingBar';
import Calendar from '../components/Calendar';
import TimeEntryListing from '../components/TimeEntryListing';
import TimeEntry from '../components/TimeEntryListing/_item';

class TrackingPage extends Component {
  static propTypes = {
    ui: PropTypes.object,
    updateUI: PropTypes.func,
    actions: PropTypes.object.isRequired,
    trackingState: PropTypes.object.isRequired
  };

  componentDidMount() {
    this.props.actions
      .getProjects()
      .then(() => this.props.actions.getCurrentTimeEntry());
    this.props.actions
      .getTimeEntries();
  };

  render() {
    const calendarState = this.props.trackingState.calendar;
    let timeEntries = calendarState.timeEntriesByDay[calendarState.selectedDay.toString()] || [];
    timeEntries = timeEntries.map((entry, i) =>
      (<TimeEntry key={i} index={i+1} item={entry} />)
    );

    return (
      <div id="tracking-container">
        <div className="week-detail">weekview</div>
        <div className="time-entries-container">
          <Calendar
            onSelectDay={this.props.actions.selectDay}
            selectedDay={calendarState.selectedDay}
            timeEntriesByDay={calendarState.timeEntriesByDay}/>
          <TimeEntryListing>
            {timeEntries}
          </TimeEntryListing>
          <div className="time-entries">Time entries</div>
        </div>
        <TrackingBar
          trackingState={this.props.trackingState}
          project={this.props.trackingState.selected}
          currentTimeEntry={this.props.trackingState.currentTimeEntry}
          onSelect={this.props.actions.selectProject}
          onDelete={(id) =>
            this.props.actions
              .deleteProject(id)
              .then(this.props.actions.getProjects)
          }
          onUnfold={this.props.actions.openProject}
          onNew={(name, parent_id) =>
            this.props.actions
              .postProject({name, parent_id})
              .then(this.props.actions.getProjects)
          }
          onStart={() => {
              const selected = this.props.trackingState.selected;
              if (selected && selected.id) {
                this.props.actions
                  .postTimeEntry(selected.id)
                  .then(() => this.props.actions.getCurrentTimeEntry())
              }
            }
          }
          onStop={() =>
            this.props.actions
              .stopTimeEntry()
              .then(() => this.props.actions.getCurrentTimeEntry())
          }

        />
      </div>
    );
  };
}

function mapStateToProps(state) {
  return {
    trackingState: state.trackingState.view
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ui({
  key: "tracking-container",
  state: {
  }
})(TrackingPage));
