import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ui from 'redux-ui';
import _ from 'lodash';
import * as actions from '../actions';
import { Link, IndexLink } from 'react-router';

import Topbar from '../components/Layout/Topbar';

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
      <div className="container">
        <Topbar>
          <ul className="admin-navigation">
            <li><Link to="/app/dashboard">Dashboard</Link></li>
            <li><Link to="/app/clients">Clients</Link></li>
            <li><Link to="/app/assignments">Assignments</Link></li>
            <li><Link to="/app/documents">Documents</Link></li>
          </ul>
        </Topbar>
        <main>
          {this.props.children}
        </main>
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
