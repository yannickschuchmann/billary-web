import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions';
import ProjectListing from '../components/ProjectListing';

class TrackingPage extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    projectsState: PropTypes.object.isRequired
  };

  componentDidMount() {
    this.props.actions.getProjects();
  }

  render() {
    return (
      <ProjectListing projects={this.props.projectsState.projects} />
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
