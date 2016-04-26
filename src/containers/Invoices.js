import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ui from 'redux-ui';
import _ from 'lodash';
import * as actions from '../actions';
import { RaisedButton, RefreshIndicator, DatePicker } from 'material-ui/lib';
import InvoiceListing from '../components/InvoiceListing';
import { moment } from '../businessLogic/calendarHelper';
import InvoiceForm from '../components/InvoiceForm';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

const initialState = {
  editItem: {},
  showForm: false
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
    this.props.actions.getInvoices();
  };

  componentWillReceiveProps(newProps) {
  };

  handleGenerate(e) {
    const { generateInvoices, getInvoices } = this.props.actions;
    generateInvoices({
      till: moment(this.refs.tillDate.getDate())
    }).then(getInvoices);
  };

  handleEditClick(item) {
    this.setState({
      editItem: item,
      showForm: true
    });
  };

  handleFormClose() {
    this.setState({
      editItem: {},
      showForm: false
    })
  };

  handleFormSubmit(model) {
    const { patchInvoice, getInvoices } = this.props.actions;
    patchInvoice(model).then(getInvoices);
  };

  render() {
    let { isGenerating, data: invoices } = this.props.invoices;
    let { showForm, editItem } = this.state;

    const invoiceForm = showForm ? (
      <InvoiceForm
        key="invoiceForm"
        onSubmit={this.handleFormSubmit.bind(this)}
        onRequestClose={this.handleFormClose.bind(this)}
        item={this.state.editItem} />
    ) : "";

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
          invoices={invoices}/>
        <ReactCSSTransitionGroup transitionName="move-up"
          transitionEnterTimeout={250} transitionLeaveTimeout={250}>
          {invoiceForm}
        </ReactCSSTransitionGroup>
      </div>
    );
  };
}

function mapStateToProps(state) {
  return {
    invoices: state.invoices
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
