import React, { Component } from 'react';
import { HOC } from 'formsy-react';
import { TextField } from 'material-ui/lib';
import objectAssign from 'object-assign';

let changeTimeout;

class Input extends Component {
  handleBlur(event) {
    this.props.setValue(event.currentTarget.value);
    if (this.props.onBlur) this.props.onBlur(event);
  };

  handleChange(event) {
    // performance related workaround
    clearTimeout(changeTimeout);
    const value = event.target.value;
    changeTimeout = setTimeout(() => {this.props.setValue(value)}, 0);
    if (this.props.onChange) this.props.onChange(event);
  }

  render() {
    return (
      <TextField
        {...this.props}
        onBlur={this.handleBlur.bind(this)}
        onChange={this.handleChange.bind(this)}
        defaultValue={this.props.value}
        value={this.props.getValue()}
        fullWidth={true}
        errorText={this.props.getErrorMessage()}
        style={objectAssign({
          width: 250,
          display: "block"
        }, this.props.style)}
        />
    )
  }
}
export default HOC(Input);
