import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ui from 'redux-ui';
import _ from 'lodash';
import * as actions from '../actions';
import {
  RaisedButton,
  FlatButton,
  Dialog,
  RefreshIndicator,
  DatePicker,
  FloatingActionButton
  } from 'material-ui/lib';
import InvoiceListing from '../components/InvoiceListing';
import { moment } from '../businessLogic/calendarHelper';
import InvoiceForm from '../components/InvoiceForm';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import AddIcon from 'material-ui/lib/svg-icons/content/add';

const initialState = {
  editItem: {line_items: []},
  showForm: false,
  openDestroyConfirmation: false,
  destroyingItem: null
};

class Invoices extends Component {
  static propTypes = {
    ui: PropTypes.object,
    updateUI: PropTypes.func,
    actions: PropTypes.object.isRequired
  };


  constructor(props) {
    super(props);
    this.state = initialState;
  };

  componentDidMount() {
    const { actions } = this.props;
    actions.getInvoices();
    actions.getClients();
  };

  componentWillReceiveProps(newProps) {
  };

  handleGenerate(e) {
    const { generateInvoices, getInvoices } = this.props.actions;
    generateInvoices({
      till: moment(this.refs.tillDate.getDate())
    }).then(getInvoices);
  };

  handleNewClick() {
    this.setState({
      editItem: initialState.editItem,
      showForm: true
    });
  }

  handleEditClick(item) {
    this.setState({
      editItem: item,
      showForm: true
    });
  };

  handleDeleteClick(item) {
    this.setState({
      openDestroyConfirmation: true,
      destroyingItem: item
    })
  };

  handleFormClose() {
    this.setState({
      editItem: initialState.editItem,
      showForm: false
    })
  };

  handleFormSubmit(model) {
    const { postInvoice, patchInvoice, getInvoices } = this.props.actions;
    const method = model.id ? patchInvoice : postInvoice;
    method(model).then(getInvoices);
  };

  handleDialogClose() {
    this.setState({
      openDestroyConfirmation: false,
      destroyingItem: null
    });
  };

  render() {
    let {
      isGenerating,
      isFetching: isFetchingInvoices,
      data: invoices
    } = this.props.invoices;
    const {
      data: clients
    } = this.props.clients;
    let { showForm, editItem } = this.state;

    const invoiceForm = showForm ? (
      <InvoiceForm
        key="invoiceForm"
        onSubmit={this.handleFormSubmit.bind(this)}
        onRequestClose={this.handleFormClose.bind(this)}
        clients={clients}
        item={this.state.editItem} />
    ) : "";

    const destroyDialogActions = [
      <FlatButton
        label="Cancel"
        secondary={true}
        onTouchTap={this.handleDialogClose.bind(this)}
      />,
      <FlatButton
        label="I'm sure"
        primary={true}
        onTouchTap={() => {
          const { deleteInvoice, getInvoices } = this.props.actions;
          deleteInvoice(this.state.destroyingItem.id).then(getInvoices);
          this.handleDialogClose();
        }}
      />,
    ];

    return (
      <div id="invoices-container">
        <div className="generation">
          <DatePicker ref="tillDate" hintText="Till" autoOk={true} floatingLabelText="Trackings till:" defaultDate={new Date()} />
          <div className="action">
            <RaisedButton
              disabled={isGenerating}
              primary={true}
              label={isGenerating ? "Generating" : "Generate"}
              onClick={this.handleGenerate.bind(this)} />
          </div>
        </div>
        <InvoiceListing
          onEdit={this.handleEditClick.bind(this)}
          onDelete={this.handleDeleteClick.bind(this)}
          invoices={invoices}/>
        <ReactCSSTransitionGroup transitionName="move-up"
          transitionEnterTimeout={250} transitionLeaveTimeout={250}>
          {invoiceForm}
        </ReactCSSTransitionGroup>
        <Dialog
          actions={destroyDialogActions}
          modal={false}
          open={this.state.openDestroyConfirmation}
          onRequestClose={this.handleDialogClose}
        >
          Are you sure you want to delete this invoice?
        </Dialog>
        <FloatingActionButton
          onClick={this.handleNewClick.bind(this)}
          style={{
            position: "absolute",
            right: 23,
            bottom: 23
          }}>
          <AddIcon />
        </FloatingActionButton>
      </div>
    );
  };
}

function mapStateToProps(state) {
  return {
    invoices: state.invoices,
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
  key: "invoices-container",
  state: {}
})(Invoices));
