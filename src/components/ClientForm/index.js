import React, { Component, PropTypes } from 'react';
import ui from 'redux-ui';
import { Divider, MenuItem, FlatButton, RaisedButton } from 'material-ui/lib';
import { Form } from 'formsy-react';
import { SelectField, TextField } from '../FormFields';
import { supportedCountries as countries } from '../../businessLogic/i18n';

const countryItems = countries.map((item, i) => (
  <MenuItem value={item.code} key={i} primaryText={item.name}/>
));

class ClientForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      canSubmit: false
    };
  }
  static propTypes = {
    ui: PropTypes.object,
    updateUI: PropTypes.func,
    client: PropTypes.object
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
    model.id = this.props.client.id;
    if (!model.id) this.reset();
    this.props.onSubmit(model);
  };

  reset() {
    this.refs.form.reset();
  };

  render() {
    const { isEditing } = this.props;
    const { number, name, address } = this.props.client;
    const { line_1, line_2, locality, province, postcode, country } = address || {};
    const submitButton = (
      <RaisedButton
        type="submit"
        label={isEditing ? "update" : "create"}
        primary={true}
        disabled={!this.state.canSubmit}/>
    );
    const removeButton = isEditing ? (
      <FlatButton
        label="delete"
        secondary={true}
        onClick={this.props.onDelete}
        />
    ) : "";
    return (
      <div className="client-form">
        <Form ref="form"
          onValidSubmit={this.submit.bind(this)}
          onValid={this.enableSubmit.bind(this)}
          onInvalid={this.disableSubmit.bind(this)}>
          <TextField name="number" value={number} floatingLabelText="Client Number" required />
          <TextField name="name" value={name} floatingLabelText="Name" required />
          <TextField name="address_attributes.line_1" value={line_1} floatingLabelText="Line 1" required />
          <TextField name="address_attributes.line_2" value={line_2} floatingLabelText="Line 2" />
          <TextField name="address_attributes.locality" value={locality} floatingLabelText="City" required />
          <TextField name="address_attributes.province" value={province} floatingLabelText="State" required />
          <TextField name="address_attributes.postcode" value={postcode} floatingLabelText="ZIP / Post Code" required />
          <SelectField
            name="address_attributes.country"
            value={country}
            modelId={this.props.client.id}
            floatingLabelText="Country" required>
            {countryItems}
          </SelectField>
          <div className="buttons">
            {submitButton}
            {removeButton}
          </div>
        </Form>
      </div>
    )
  }
}

export default ui({
  state: {
  }
})(ClientForm)
