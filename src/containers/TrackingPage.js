import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ui from 'redux-ui';
import _ from 'lodash';
import * as actions from '../actions';
import {moment, minutesToCounterString} from '../businessLogic/calendarHelper';
import TrackingBar from '../components/TrackingBar';
import Calendar from '../components/Calendar';
import TimeEntryListing from '../components/TimeEntryListing';
import TimeEntry from '../components/TimeEntryListing/_item';
import Modal from '../components/Modal';
import ProjectSelector from '../components/ProjectSelector';
import TimeEntryForm from '../components/TimeEntryForm';

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
      .then(() => {
        this.props.actions.getCurrentTimeEntry();
        this.props.actions.getTimeEntries();
      });

  };

  showTimeEntryModal(entry = null) {
    this.props.updateUI({
      showTimeEntryModal: true,
      editTimeEntry: entry
    });
  };

  closeTimeEntryModal() {
    this.props.updateUI({
      showTimeEntryModal: false,
      editTimeEntry: null
    });
  };

  submitTimeEntry(entry) {
    const actions = this.props.actions;
    const promise =
      (entry.id) ? actions.patchTimeEntry(entry) : actions.postTimeEntry(entry);
    promise.then(actions.getTimeEntries);
    this.closeTimeEntryModal();
  }

  render() {
    const calendarState = this.props.trackingState.calendar;
    let timeEntries = calendarState.timeEntriesByDay[calendarState.selectedDay.toString()] || [];

    const durationForSelectedDay = _.reduce(
      _.values(timeEntries),
      (sum, entry) => sum + entry.duration,
      0
    );

    timeEntries = timeEntries.map((entry, i) =>
      (<TimeEntry
        onEdit={() => this.showTimeEntryModal(entry)}
        onDelete={() => this.props.actions.deleteTimeEntry(entry.id)
          .then(this.props.actions.getTimeEntries)}
        key={i}
        index={i+1}
        item={entry} />)
    );

    return (
      <div id="tracking-container">
        <div className="week-detail">weekview</div>
        <div className="time-container">
          <Calendar
            onSelectDay={this.props.actions.selectDay}
            selectedDay={calendarState.selectedDay}
            timeEntriesByDay={calendarState.timeEntriesByDay}/>
          <div className="time-entries-container">
            <div className="time-entry-listing-header">
              {moment(calendarState.selectedDay).format("dddd, Do MMMM YYYY")}
              <div className="days-workload">
                {minutesToCounterString(durationForSelectedDay)} H
              </div>
            </div>
            <TimeEntryListing>
              {timeEntries}
            </TimeEntryListing>
          </div>
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
              .then(this.props.actions.getTimeEntries)
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
                  .then(() => {
                    this.props.actions.getCurrentTimeEntry();
                    this.props.actions.getTimeEntries();
                  })
              }
            }
          }
          onStop={() =>
            this.props.actions
              .stopTimeEntry()
              .then(() => {
                this.props.actions.getCurrentTimeEntry();
                this.props.actions.getTimeEntries();
              })
          }

        />
        <Modal
          className="modal-time-entry-form"
          isOpen={this.props.ui.showTimeEntryModal}
          onClose={this.closeTimeEntryModal.bind(this)}>
          <TimeEntryForm
            onSubmit={this.submitTimeEntry.bind(this)}
            entry={this.props.ui.editTimeEntry} />
        </Modal>
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
    showTimeEntryModal: false,
    editTimeEntry: null
  }
})(TrackingPage));
