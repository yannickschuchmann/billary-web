import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link, IndexLink } from 'react-router';
import * as actions from '../actions';
import FlatButton from 'material-ui/lib/flat-button';
import AppBar from 'material-ui/lib/app-bar';

class Content extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    app: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
  };

  getNavButton(label) {
    return <FlatButton label={label} />
  };

  render() {
    const authLinks = this.props.auth.user.isSignedIn ?
    [
      <Link key="settings" to="/settings">{this.getNavButton("Settings")}</Link>,
      <Link key="logout" to="/logout">{this.getNavButton("Logout")}</Link>
    ] :
    [
      <Link key="register" to="/register">{this.getNavButton("Register")}</Link>,
      <Link key="login" to="/login">{this.getNavButton("Login")}</Link>
    ];

    return (
      <div className="content">
        <AppBar
          className="app-bar"
          title="Billary"
          iconElementLeft={<span></span>}>
          <IndexLink to="/">{this.getNavButton("Start")}</IndexLink>
          <Link to="/about">{this.getNavButton("About")}</Link>
          <Link to="/app">{this.getNavButton("App")}</Link>
          {authLinks}
        </AppBar>
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
)(Content);
