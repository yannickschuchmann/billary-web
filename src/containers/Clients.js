import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ui from 'redux-ui';
import _ from 'lodash';
import * as actions from '../actions';
import {Paper} from 'material-ui/lib';
import ClientListing from '../components/ClientListing';
import ClientForm from '../components/ClientForm';
import EditIcon from 'material-ui/lib/svg-icons/image/edit';

const language = (window.navigator.language || window.navigator.userLanguage).split('-');
const initialClient = {
  address: {
    country: language[language.length - 1].toLowerCase()
  },
  currency: "EUR"
}

class Clients extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedClient: initialClient,
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

  selectClient(indexes) {
    if (indexes.length) {
      this.setState({
        selectedIndex: indexes[0],
        selectedClient: this.props.clients.data[indexes[0]]
      });
    } else {
      this.resetSelection();
    }
  };

  submit(model) {
    let promise;
    if (model.id) {
      promise = this.props.actions.patchClient(model);
    } else {
      promise = this.props.actions.postClient(model);
      this.resetSelection();
    }
    promise.then(() => this.props.actions.getClients())
  };

  delete() {
    const clientId = this.state.selectedClient.id;
    if (clientId) {
      this.props.actions
        .deleteClient(clientId)
        .then(() => this.props.actions.getClients());
      this.resetSelection();
    }
  };

  resetSelection() {
    this.setState({
      selectedIndex: null,
      selectedClient: initialClient
    });
  };

  render() {
    const isEditing = !!this.state.selectedClient.id;
    return (
      <div id="clients-container">
        <ClientListing
          selected={this.state.selectedIndex}
          onSelect={this.selectClient.bind(this)}
          clients={this.props.clients.data}/>
        <Paper rounded={false} zDepth={2} className="client-actions">
          <small className={`is-editing ${isEditing ? 'show' : 'hidden'}`}>
            <EditIcon/>editing
          </small>
          <ClientForm
            ref="form"
            onDelete={this.delete.bind(this)}
            onSubmit={this.submit.bind(this)}
            isEditing={isEditing}
            client={this.state.selectedClient} />
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
