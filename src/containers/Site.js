import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link, IndexLink } from 'react-router';
import { Snackbar } from 'material-ui/lib';
import * as actions from '../actions';

import getMuiTheme from 'material-ui/lib/styles/getMuiTheme';
import CustomRawTheme from '../themes';

class Site extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    app: PropTypes.object.isRequired,
    notification: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
  };

  static childContextTypes = {
    muiTheme: React.PropTypes.object,
  };

  getChildContext() {
    return {
      muiTheme: getMuiTheme(CustomRawTheme),
    };
  };

  render() {
    return (
      <div className="site">
        {this.props.children}
        <Snackbar
          open={this.props.notification.snackbarOpen}
          message={this.props.notification.snackbar}
          action=""
          autoHideDuration={3000}
          onRequestClose={(reason) => {this.props.actions.hideSnackbar()}}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    app: state.app,
    notification: state.notification
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
)(Site);
