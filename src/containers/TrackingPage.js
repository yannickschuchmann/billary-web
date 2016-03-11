import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions';
import TrackingBar from '../components/TrackingBar';
import ui from 'redux-ui';

class TrackingPage extends Component {
  static propTypes = {
    ui: PropTypes.object,
    updateUI: PropTypes.func,
    actions: PropTypes.object.isRequired,
    projectsState: PropTypes.object.isRequired
  };

  componentDidMount() {
    this.props.actions.getProjects();
  };

  render() {
    return (
      <div id="tracking-container">
        <TrackingBar
          projectsState={this.props.projectsState}
          project={this.props.projectsState.selected}
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
