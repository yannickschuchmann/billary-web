import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';
import * as actions from '../actions/auth';
import Auth from 'j-toker';

// Since this component is simple and static, there's no parent container for it.
class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      resetDialogOpen: false,
      email: ""
    }
  }

  static propTypes = {
    actions: PropTypes.object.isRequired,
  };

  componentDidMount() {
    console.log(Auth.mustResetPassword)
  }

  handleOpen() {
    this.setState({resetDialogOpen: true});
  };

  handleClose() {
    this.setState({resetDialogOpen: false});
  };

  handleResetPassword() {
    this.props.actions.requestPasswortReset(this.refs.resetEmail.value)
    this.handleClose();
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
    const dialogActions = [
        <FlatButton
          label="Cancel"
          secondary={true}
          onTouchTap={this.handleClose.bind(this)}
        />,
        <FlatButton
          label="Send new password"
          primary={true}
          onTouchTap={this.handleResetPassword.bind(this)}
        />,
      ];
    return (
      <div>
        <h2>Login yoho</h2>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <input
                name="email"
                onChange={(e) => this.setState({email: e.target.value})}
                ref="email"
                type="email"/>
          <input name="password" ref="password" type="password"/>
          <input type="submit"/>
        </form>
        <FlatButton label="Reset password" onTouchTap={this.handleOpen.bind(this)} />
        <Dialog
          title="Reset password"
          actions={dialogActions}
          modal={false}
          open={this.state.resetDialogOpen}
          onRequestClose={this.handleClose.bind(this)}
        >
          If you've forgotten your password, we'll send you an email to reset your password.
          <br/>
          <input ref="resetEmail" type="email" name="email" value={this.state.email}
            onChange={() => null}/>
        </Dialog>
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
)(SignIn);
