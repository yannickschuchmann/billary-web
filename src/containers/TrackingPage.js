import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ui from 'redux-ui';
import * as actions from '../actions';
import TrackingBar from '../components/TrackingBar';
import Calendar from '../components/Calendar';

class TrackingPage extends Component {
  static propTypes = {
    ui: PropTypes.object,
    updateUI: PropTypes.func,
    actions: PropTypes.object.isRequired,
    projectsState: PropTypes.object.isRequired
  };

  componentDidMount() {
    this.props.actions
      .getProjects()
      .then(() => this.props.actions.getCurrentTimeEntry());
  };

  render() {
    return (
      <div id="tracking-container">
        <div className="week-detail">weekview</div>
        <div className="time-entries-container">
          <Calendar/>
          <div className="time-entries">Time entries</div>
        </div>
        <TrackingBar
          projectsState={this.props.projectsState}
          project={this.props.projectsState.selected}
          currentTimeEntry={this.props.projectsState.currentTimeEntry}
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
              const selected = this.props.projectsState.selected;
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
    projectsState: state.projectsState.view
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
