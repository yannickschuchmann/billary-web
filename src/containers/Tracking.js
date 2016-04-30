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
import ProjectWrap from '../components/TimeEntryListing/_project';
import Modal from '../components/Modal';
import ProjectSelector from '../components/ProjectSelector';
import TimeEntryForm from '../components/TimeEntryForm';
import FloatingActionButton from 'material-ui/lib/floating-action-button';
import ContentAdd from 'material-ui/lib/svg-icons/content/add';
import VisualDay from '../components/VisualDay';
import Topbar from '../components/Layout/Topbar';

class Tracking extends Component {
  static propTypes = {
    ui: PropTypes.object,
    updateUI: PropTypes.func,
    actions: PropTypes.object.isRequired,
    tracking: PropTypes.object.isRequired
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
    promise.then(() => {
      actions.getTimeEntries()
    });
    this.closeTimeEntryModal();
  };

  toggleTimeEntriesForProject(projectId) {
    const current = this.props.ui.openTimeEntriesForProject;
    this.props.updateUI("openTimeEntriesForProject",
      current == projectId ? null : projectId);
  };

  handleAfterMinute() {
    if (this.props.tracking.currentTimeEntry) {
      this.props.actions.updateTimeEntries();
    }
  };

  handleSelectAndStart(id) {
    this.props.actions.selectProject(id);
    this.props.actions
      .postTimeEntry({project_id: id})
      .then(() => {
        this.props.actions.getCurrentTimeEntry();
        this.props.actions.getTimeEntries();
      })
  };

  handleStop() {
    this.props.actions
      .stopTimeEntry()
      .then(() => {
        this.props.actions.getCurrentTimeEntry();
        this.props.actions.getTimeEntries();
      })
  };

  render() {
    const calendarState = this.props.tracking.calendar;
    const projectWrapsForDay = this.props.tracking
      .projectWrappedTimeEntries[calendarState.selectedDay.toString()] || {};

    let durationForSelectedDay = 0;
    let projectWraps = [];

    let i = 0;

    if (!this.props.tracking.isFetching) {
      _.forOwn(projectWrapsForDay, (items, key) => {
        const entries = items.map((entry, i) => (<TimeEntry
          onEdit={() => this.showTimeEntryModal(entry)}
          onDelete={() => this.props.actions.deleteTimeEntry(entry.id)
            .then(this.props.actions.getTimeEntries)}
          key={entry.id}
          index={i+1}
          item={entry} />)
        );

        const duration = _.reduce(items,(sum, entry) => sum + entry.duration_overhang,0);
        const project = this.props.tracking.projectsById[key];
        const isRunning = !!_.find(items, {id: this.props.tracking.currentTimeEntry.id})
        projectWraps.push(
          <ProjectWrap
            key={key}
            isRunning={isRunning}
            index={i + 1}
            onSelectAndStart={this.handleSelectAndStart.bind(this)}
            onStop={this.handleStop.bind(this)}
            open={this.props.ui.openTimeEntriesForProject == key}
            project={project}
            duration={duration}

            onToggle={(e) => this.toggleTimeEntriesForProject(key)}>
            {entries}
          </ProjectWrap>
        );

        durationForSelectedDay += duration;
        i++;
      });
    }

    return (
      <div className="container">
        <Topbar>
          topbar
        </Topbar>
        <main>
          <div id="tracking-container">
            <div className="visual-day-container">
              <VisualDay
                afterMinute={this.handleAfterMinute.bind(this)}
                selectedDay={calendarState.selectedDay}
                projectWrapsForDay={projectWrapsForDay}
                />
            </div>
            <div className="time-container">
              <Calendar
                onSelectDay={this.props.actions.selectDay}
                selectedDay={calendarState.selectedDay}
                timeEntriesByDay={calendarState.timeEntriesByDay}/>
              <div className="time-entries-container">
                <div className="time-entry-listing-header">
                  <div className="day-label">
                    <span>{moment(calendarState.selectedDay).format("dddd, Do MMMM YYYY")}</span>
                  </div>
                  <div className="day-workload">
                    {minutesToCounterString(durationForSelectedDay)} H
                  </div>
                </div>
                <TimeEntryListing>
                  {projectWraps}
                </TimeEntryListing>
                <FloatingActionButton
                  mini={true}
                  style={{
                    position: "absolute",
                    right: 20,
                    bottom: 20
                  }}
                  onMouseUp={() => this.showTimeEntryModal()}
                  >
                  <ContentAdd />
                </FloatingActionButton>
              </div>
            </div>
            <TrackingBar
              tracking={this.props.tracking}
              project={this.props.tracking.selected}
              currentTimeEntry={this.props.tracking.currentTimeEntry}
              onSelect={this.props.actions.selectProject}
              onSelectAndStart={this.handleSelectAndStart.bind(this)}
              onDelete={(id) =>
                this.props.actions
                  .deleteProject(id)
                  .then(this.props.actions.getProjects)
                  .then(this.props.actions.getTimeEntries)
              }
              onEdit={(project) =>
                this.props.actions
                  .patchProject(project)
                  .then(this.props.actions.getProjects)
              }
              onUnfold={this.props.actions.openProject}
              onNew={(name, parent_id) =>
                this.props.actions
                  .postProject({name, parent_id})
                  .then(this.props.actions.getProjects)
              }
              onStart={() => {
                  const selected = this.props.tracking.selected;
                  if (selected && selected.id) {
                    this.props.actions
                      .postTimeEntry({project_id: selected.id})
                      .then(() => {
                        this.props.actions.getCurrentTimeEntry();
                        this.props.actions.getTimeEntries();
                      })
                  }

                }
              }
              onStop={this.handleStop.bind(this)}
            />
            <Modal
              className="modal-time-entry-form"
              key={this.props.ui.editTimeEntry}
              isOpen={this.props.ui.showTimeEntryModal}
              onClose={this.closeTimeEntryModal.bind(this)}>
              <TimeEntryForm
                selectedProject={this.props.tracking.selected}
                projects={this.props.tracking.projects}
                onSubmit={this.submitTimeEntry.bind(this)}
                entry={this.props.ui.editTimeEntry} />
            </Modal>
          </div>
        </main>
      </div>
    );
  };
}

function mapStateToProps(state) {
  return {
    tracking: state.tracking.view
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
    editTimeEntry: null,
    openTimeEntriesForProject: null
  }
})(Tracking));
