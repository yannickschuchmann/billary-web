import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link, IndexLink } from 'react-router';
import * as actions from '../actions';

class Site extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    app: PropTypes.object.isRequired
  };

  render() {
    return (
      <div className="site">
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
)(Site);
