import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';
import LeftNav from 'material-ui/lib/left-nav';
import { MenuItem, Divider, Paper } from 'material-ui/lib';
import * as actions from '../../actions/auth';
import Auth from 'j-toker';

// Since this component is simple and static, there's no parent container for it.
class Settings extends Component {
  static propTypes = {
    children: PropTypes.node
  }

  getLink(name, path) {
    return (<Link to={path}><MenuItem>{name}</MenuItem></Link>)
  }

  render() {
    return (
      <div className="page">
        <Paper zDepth={2} className="sidebar page-sidebar settings-sidebar">
          <MenuItem>Settings</MenuItem>
          <Divider />
          {this.getLink("Change Password", "/settings/change-password")}
          {this.getLink("Delete Account", "/settings/delete-account")}
        </Paper>
        <div className="page-content">
          {this.props.children}
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Settings);
