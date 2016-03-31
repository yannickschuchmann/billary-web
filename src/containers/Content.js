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
    app: PropTypes.object.isRequired
  };

  getNavButton(label) {
    return <FlatButton label={label} />
  }

  render() {
    const navElements = [

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
          <Link to="/register">{this.getNavButton("Register")}</Link>
          <Link to="/login">{this.getNavButton("Login")}</Link>
        </AppBar>
        {this.props.children}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    app: state.app,
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
