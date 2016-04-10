import React, { Component, PropTypes } from 'react';
import ui from 'redux-ui';
import { Divider, MenuItem, RaisedButton } from 'material-ui/lib';
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

  render() {
    const { number, name } = this.props.client;
    return (
      <div className="client-form">
        <Form onValidSubmit={this.props.submit} onValid={this.enableSubmit.bind(this)} onInvalid={this.disableSubmit.bind(this)}>
          <TextField name="number" floatingLabelText="Client Number" required />
          <TextField name="name" floatingLabelText="Name" required />
          <TextField name="address_attributes.line_1" floatingLabelText="Line 1" required />
          <TextField name="address_attributes.line_2" floatingLabelText="Line 2" />
          <TextField name="address_attributes.locality" floatingLabelText="City" required />
          <TextField name="address_attributes.province" floatingLabelText="State" required />
          <TextField name="address_attributes.postcode" floatingLabelText="ZIP / Post Code" required />
          <SelectField name="address_attributes.country" floatingLabelText="Country" required>
            {countryItems}
          </SelectField>
          <RaisedButton type="submit" label="save" disabled={!this.state.canSubmit}/>
        </Form>
      </div>
    )
  }
}

export default ui({
  state: {
  }
})(ClientForm)
