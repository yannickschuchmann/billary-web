import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ui from 'redux-ui';
import _ from 'lodash';
import * as actions from '../actions';
import { RaisedButton, RefreshIndicator, DatePicker } from 'material-ui/lib';
import InvoiceListing from '../components/InvoiceListing';
import { moment } from '../businessLogic/calendarHelper';

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
    generateInvoices({
      till: moment(this.refs.tillDate.getDate())
    }).then(getInvoices);
  };

  render() {
    let { isGenerating, data: invoices } = this.props.invoices;
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
          invoices={invoices}/>
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
