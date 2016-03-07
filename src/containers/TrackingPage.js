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
          onUnfold={(id) => {
            this.props.actions.openProject(id);
          }}
          onDelete={(id) => {
            this.props.actions
              .deleteProject(id)
              .then(() => {this.props.actions.getProjects()});
          }} />
        <ProjectForm
          projectsAppState={this.props.projectsState}
          submitNewProject={(name) => {
            const parent_id = this.props.projectsState.selectedId;
            this.props.actions.postProject({name, parent_id}).then(() => {
              this.props.actions.getProjects();
            });
          }} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    projectsState: state.projectsState
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
