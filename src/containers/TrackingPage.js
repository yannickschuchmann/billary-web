import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions';
import ProjectListing from '../components/ProjectListing';
import ProjectForm from '../components/ProjectForm';
import TrackingBar from '../components/TrackingBar';

class TrackingPage extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    projectsState: PropTypes.object.isRequired
  };

  componentDidMount() {
    this.props.actions.getProjects();
  };

  render() {
    console.log(this.props.projectsState);
    return (
      <div>
        <ProjectListing
          tree={this.props.projectsState.tree}
          isFetching={this.props.projectsState.isFetching}
          selected={this.props.projectsState.selected}
          onSelect={(id) => {
            this.props.actions.selectProject(id);
          }}
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
            const parent_id = this.props.projectsState.selected.id;
            this.props.actions.postProject({name, parent_id}).then(() => {
              this.props.actions.getProjects();
            });
          }} />

        <TrackingBar project={this.props.projectsState.selected} />
      </div>
    );
  }
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
)(TrackingPage);
