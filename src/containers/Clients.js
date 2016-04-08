import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ui from 'redux-ui';
import _ from 'lodash';
import * as actions from '../actions';
import {Paper} from 'material-ui/lib';
import ClientListing from '../components/ClientListing';
import ClientForm from '../components/ClientForm';

class Clients extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedClient: {},
      selectedIndex: null
    }
  };

  static propTypes = {
    ui: PropTypes.object,
    updateUI: PropTypes.func,
    actions: PropTypes.object.isRequired,
    clients: PropTypes.object
  };

  componentDidMount() {
    this.props.actions.getClients();
  };

  componentWillReceiveProps(newProps) {
  };

  selectClient(indexes) {
    this.setState({
      selectedIndex: indexes.length ? indexes[0] : null,
      selectedClient: indexes.length ? this.props.clients.data[indexes[0]] : {},
    });
  };

  render() {
    return (
      <div id="clients-container">
        <ClientListing
          selected={this.state.selectedIndex}
          onSelect={this.selectClient.bind(this)}
          clients={this.props.clients.data}/>
        <Paper zDepth={2} className="client-actions">
          <ClientForm client={this.state.selectedClient} />
        </Paper>
      </div>
    );
  };
}

function mapStateToProps(state) {
  return {
    clients: state.clients
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
)(ui({
  key: "clients-container",
  state: {}
})(Clients));
