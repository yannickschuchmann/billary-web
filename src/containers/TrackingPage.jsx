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
          items={this.props.projectsState.items}
          isLoading={this.props.projectsState.isLoading}
          onClick={(id) => {
            this.props.actions.openProject(id);
          }} />
        <ProjectForm
          projectsAppState={this.props.projectsState}
          submitNewProject={(name) => {
            const parent_id = this.props.projectsState.selectedId;
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
