import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ui from 'redux-ui';
import _ from 'lodash';
import * as actions from '../actions';
import { Link, IndexLink } from 'react-router';

class Dashboard extends Component {
  static propTypes = {
    ui: PropTypes.object,
    updateUI: PropTypes.func,
    actions: PropTypes.object.isRequired
  };

  componentDidMount() {
  };

  componentWillReceiveProps(newProps) {
  };


  render() {
    return (
      <div id="dashboard-container">
        <ul>
          <li><Link to="/app/clients">Clients</Link></li>
          <li><Link to="/app/documents">Documents</Link></li>
        </ul>
      </div>
    );
  };
}

function mapStateToProps(state) {
  return {
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
  key: "dashboard-container",
  state: {}
})(Dashboard));
