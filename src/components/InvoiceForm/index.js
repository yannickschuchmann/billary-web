import React, { Component, PropTypes } from 'react';
import ui from 'redux-ui';
import { Divider, MenuItem, FlatButton, RaisedButton } from 'material-ui/lib';
import { Form } from 'formsy-react';
import { SelectField, TextField } from '../FormFields';

class InvoiceForm extends Component {
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
    const isEditing = true;
    const {  } = this.props.item;
    const submitButton = (
      <RaisedButton
        type="submit"
        label={isEditing ? "update" : "create"}
        primary={true}
        disabled={!this.state.canSubmit}/>
    );
    const cancelButton = (
      <FlatButton
        label="cancel"
        secondary={true}
        onClick={this.props.onRequestClose}
        />
    );
    return (
      <div className="invoice-form">
        <Form ref="form"
          onValidSubmit={this.submit.bind(this)}
          onValid={this.enableSubmit.bind(this)}
          onInvalid={this.disableSubmit.bind(this)}>
          <TextField name="number" value={0} floatingLabelText="Client Number" required />
          <div className="buttons">
            {submitButton}
            {cancelButton}
          </div>
        </Form>
      </div>
    )
  }
}

export default ui({
  state: {
  }
})(InvoiceForm)
