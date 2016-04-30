import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ui from 'redux-ui';
import _ from 'lodash';
import * as actions from '../actions';
import { Link, IndexLink } from 'react-router';
import ProjectListing from '../components/ProjectListing';

class Projects extends Component {
  static propTypes = {
    ui: PropTypes.object,
    updateUI: PropTypes.func,
    actions: PropTypes.object.isRequired
  };

  componentDidMount() {
    this.props.actions.getProjects();
    this.props.actions.getClients();
  };

  componentWillReceiveProps(newProps) {
  };

  handleAssign(project) {
    const { actions } = this.props;
    actions.assignClientToProject(project).then(() => actions.getProjects());
  }

  render() {
    return (
      <div id="projects-container">
        <ProjectListing
          clients={this.props.assignments.clients}
          showAssignField={true}
          showDurations={true}
          showHeader={true}
          className="project-listing-wide"
          tree={this.props.tracking.tree}
          selected={this.props.tracking.selected}
          isFetching={this.props.tracking.isFetching}
          onUnfold={this.props.actions.openProject}
          onSelect={this.props.actions.openProject}
          onAssign={this.handleAssign.bind(this)}
          onEdit={() => {}}
          onDelete={() => {}}
          onNew={() => {}} />
      </div>
    );
  };
}

function mapStateToProps(state) {
  return {
    tracking: state.tracking.view,
    assignments: state.assignments
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
  key: "projects-container",
  state: {}
})(Projects));
