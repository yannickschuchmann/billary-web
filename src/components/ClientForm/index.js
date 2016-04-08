import React, { Component, PropTypes } from 'react';
import ui from 'redux-ui';
import { FlatButton, TextField } from 'material-ui/lib';

class ClientForm extends Component {
  static propTypes = {
    ui: PropTypes.object,
    updateUI: PropTypes.func,
    client: PropTypes.object
  };

  render() {
    const { number, name } = this.props.client;
    return (
      <div className="client-form">
        <TextField hintText="Client number" value={number}/>
        <TextField hintText="Name" value={name}/>
        <FlatButton label="save"/>
      </div>
    )
  }
}

export default ui({
  state: {
  }
})(ClientForm)
