import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link, IndexLink } from 'react-router';
import * as actions from '../actions';

import Sidebar from '../components/Layout/Sidebar';
import Topbar from '../components/Layout/Topbar';

class App extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    appState: PropTypes.object.isRequired
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
          <div className="user">
            {this.props.appState.currentUser.name}
            <br/>
            {this.props.appState.currentUser.profession}
          </div>
          <IndexLink to="/tracking">Home</IndexLink>
          <Link to="/billing">About</Link>
        </Sidebar>
        <div className="container">
          <Topbar>
            topbar
          </Topbar>
          <main>
            {this.props.children}
          </main>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    appState: state.appState,
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
