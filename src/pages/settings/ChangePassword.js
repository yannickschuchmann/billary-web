import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';
import * as actions from '../../actions/auth';
import Auth from 'j-toker';

// Since this component is simple and static, there's no parent container for it.
class ChangePassword extends Component {
  static propTypes = {
    children: PropTypes.node
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.actions.updatePassword({
      password: this.refs.password.value,
      password_confirmation: this.refs.passwordConfirmation.value
    });

    return false;
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <input type="password" name="password" ref="password"/> <br/>
          <input type="password" name="password-confirmation" ref="passwordConfirmation"/>
          <input type="submit"/>
        </form>
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
)(ChangePassword);
