import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import Dialog from 'material-ui/lib/dialog';
import RaisedButton from 'material-ui/lib/raised-button';
import DeleteForever from 'material-ui/lib/svg-icons/action/delete';
import * as actions from '../../actions/auth';
import Auth from 'j-toker';

// Since this component is simple and static, there's no parent container for it.
class DeleteAccount extends Component {
  static propTypes = {
    children: PropTypes.node
  }

  handleDelete(e) {
    this.props.actions.deleteAccount().then(browserHistory.push("/"));
  };

  render() {
    return (
      <div className="delete-account-page">
        <RaisedButton
          label="Delete account"
          primary={true}
          onClick={this.handleDelete.bind(this)}
          icon={<DeleteForever/>}
        />
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
)(DeleteAccount);
