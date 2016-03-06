import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions';
import ProjectListing from '../components/ProjectListing';
import ProjectForm from '../components/ProjectForm';

class TrackingPage extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    projectsState: PropTypes.object.isRequired
  };

  componentDidMount() {
    this.props.actions.getProjects();
  };

  render() {
    return (
      <div>
        <ProjectListing
          projects={this.props.projectsState.projects}
          onClick={(id) => {
            this.props.actions.deleteProject(id);
          }} />
        <ProjectForm
          projectsAppState={this.props.projectsState}
          submitNewProject={(name) => {
            const parent_id = this.props.projectsState.selectedProject;
            this.props.actions.postProject({name, parent_id});
          }} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    appState: state.projectsAppState,
    projectsState: state.projectsAppState
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
)(TrackingPage);
