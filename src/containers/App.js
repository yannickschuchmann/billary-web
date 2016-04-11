import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link, IndexLink } from 'react-router';
import * as actions from '../actions';

import Sidebar from '../components/Layout/Sidebar';

class App extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    app: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
  };

  componentDidMount() {
    document.body.style.overflow = "hidden";
  };

  componentWillUnmount() {
    document.body.style.overflow = "auto";
  };

  render() {
    return (
      <div className="app">
        <Sidebar>
          <div className="user-profile">
            {this.props.auth.user.attributes.email}
            <br/>
            {this.props.app.currentUser.profession}
            <Link to="/settings">Settings</Link>
          </div>
          <ul className="app-navigation">
            <li>
              <Link to="/app/tracking">Tracking</Link>
            </li>
            <li>
              <Link to="/app/dashboard">Dashboard</Link>
            </li>
          </ul>
        </Sidebar>
        {this.props.children}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    app: state.app,
    auth: state.auth
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
)(App);
