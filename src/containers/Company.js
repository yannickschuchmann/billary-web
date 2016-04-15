import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ui from 'redux-ui';
import _ from 'lodash';
import * as actions from '../actions';
import { MenuItem, RaisedButton } from 'material-ui/lib';
import { Form } from 'formsy-react';
import { SelectField, TextField } from '../components/FormFields';
import { countries } from '../businessLogic/i18n';

const countryItems = countries.map((item, i) => (
  <MenuItem value={item.code} key={i} primaryText={item.name}/>
));

class Company extends Component {
  constructor(props) {
    super(props);
    this.state = {
      canSubmit: false
    };
  }

  static propTypes = {
    ui: PropTypes.object,
    updateUI: PropTypes.func,
    actions: PropTypes.object.isRequired
  };

  componentDidMount() {
  };

  componentWillReceiveProps(newProps) {
  };

  enableSubmit() {
    this.setState({
      canSubmit: true
    });
  };

  disableSubmit() {
    this.setState({
      canSubmit: false
    });
  };

  submit(model) {
    const { patchCompany, getUser } = this.props.actions
    model.id = this.props.company.data.id;
    patchCompany(model).then(getUser);
  };

  render() {
    const company = this.props.company || {};
    const { name, web, email, phone, tax_id, vat_rate } = company.data;
    const { address, payment_address } = company.data || {};
    const { line_1, line_2, locality, province, postcode, country } = address || {};
    const { type, account_holder, iban, bic } = payment_address || {};
    return (
      <div id="company-container">
        <Form ref="form"
          onValidSubmit={this.submit.bind(this)}
          onValid={this.enableSubmit.bind(this)}
          onInvalid={this.disableSubmit.bind(this)}>
          <div className="row">
            <div className="contact-container">
              <h2>Contact</h2>
              <TextField name="name" value={name} floatingLabelText="Name" required />
              <TextField name="web" value={web} floatingLabelText="Web" required />
              <TextField name="email" value={email} floatingLabelText="E-Mail" type="email" required />
              <TextField name="phone" value={phone} floatingLabelText="Phone" required />
              <TextField name="tax_id" value={tax_id} floatingLabelText="Tax ID" required />
              <TextField name="vat_rate" value={vat_rate} floatingLabelText="VAT Rate in %" required />
            </div>
            <div className="address-container">
              <h2>Address</h2>
              <TextField name="address_attributes.line_1" value={line_1} floatingLabelText="Line 1" required />
              <TextField name="address_attributes.line_2" value={line_2} floatingLabelText="Line 2" />
              <TextField name="address_attributes.locality" value={locality} floatingLabelText="City" required />
              <TextField name="address_attributes.province" value={province} floatingLabelText="State" required />
              <TextField name="address_attributes.postcode" value={postcode} floatingLabelText="ZIP / Post Code" required />
              <SelectField
                name="address_attributes.country"
                value={country}
                modelId={company.id}
                floatingLabelText="Country" required>
                {countryItems}
              </SelectField>
            </div>
          </div>
          <div className="row">
            <div className="payment-address-container">
              <h2>Payment address</h2>
              <TextField name="payment_address_attributes.type" disabled={true} value={type} floatingLabelText="Type" />
              <TextField name="payment_address_attributes.account_holder" value={account_holder} floatingLabelText="Account holder" required />
              <TextField name="payment_address_attributes.iban" value={iban} floatingLabelText="IBAN" required />
              <TextField name="payment_address_attributes.bic" value={bic} floatingLabelText="BIC" required />
            </div>
          </div>
          <div className="actions">
            <RaisedButton
              type="submit"
              label={"update"}
              primary={true}
              disabled={!this.state.canSubmit}/>
          </div>
        </Form>
      </div>
    );
  };
}

function mapStateToProps(state) {
  return {
    company: state.company
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
  key: "Company-container",
  state: {}
})(Company));
