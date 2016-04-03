import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link, IndexLink } from 'react-router';
import { Snackbar } from 'material-ui/lib';
import * as actions from '../actions';

class Site extends Component {
  constructor(props) {
    super(props);
  };

  static propTypes = {
    actions: PropTypes.object.isRequired,
    app: PropTypes.object.isRequired,
    notification: PropTypes.object.isRequired
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
