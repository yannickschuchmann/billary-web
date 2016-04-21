import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ui from 'redux-ui';
import _ from 'lodash';
import * as actions from '../actions';
import { RaisedButton } from 'material-ui/lib';
import InvoiceListing from '../components/InvoiceListing';

class Invoices extends Component {
  static propTypes = {
    ui: PropTypes.object,
    updateUI: PropTypes.func,
    actions: PropTypes.object.isRequired
  };

  componentDidMount() {
    this.props.actions.getInvoices();
  };

  componentWillReceiveProps(newProps) {
  };

  handleGenerate(e) {
    const { generateInvoices, getInvoices } = this.props.actions;
    generateInvoices().then(getInvoices);
  };

  render() {
    return (
      <div id="invoices-container">
        isGenerating: {this.props.invoices.isGenerating ? "true" : "false"}
        <RaisedButton primary={true} label="Generate" onClick={this.handleGenerate.bind(this)} />
        <InvoiceListing
          invoices={this.props.invoices.data}/>
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
