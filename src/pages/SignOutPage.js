import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/auth';

// Since this component is simple and static, there's no parent container for it.
class SignOut extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired
  };

  componentWillMount() {
    this.props.actions
      .signOut()
      .then((value) => {browserHistory.push("/")}, (err) => console.warn(err));
  };

  render() {
    return (<div></div>)
  };
}

function mapStateToProps(state, ownProps) {
  return {
    q: ownProps.location.query
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
)(SignOut);
