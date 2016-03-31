import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/auth';

// Since this component is simple and static, there's no parent container for it.
class SignIn extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
  };

  handleSubmit(e) {
    e.preventDefault();
    const user = {
      email: this.refs.email.value,
      password: this.refs.password.value,
      config: "default"
    };
    this.props.actions.emailSignIn(user).then(browserHistory.push("/"));

    return false;
  }

  render() {
    return (
      <div>
        <h2>Login yoho</h2>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <input name="email" ref="email" type="email"/>
          <input name="password" ref="password" type="password"/>
          <input type="submit"/>
        </form>
        <button onClick={this.props.actions.authenticate}>auth</button>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {}
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignIn);
