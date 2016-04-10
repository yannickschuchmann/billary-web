import React, { Component } from 'react';
import { HOC } from 'formsy-react';
import { TextField } from 'material-ui/lib';
import objectAssign from 'object-assign';

let changeTimeout;

class Input extends Component {
  render() {
    return (
      <TextField
        style={objectAssign({
          width: 250,
          display: "block"
        }, this.props.style)}
        fullWidth={true}
        value={this.props.getValue()}
        onChange={(e) => {
          // performance related workaround
          clearTimeout(changeTimeout);
          const value = e.target.value;
          changeTimeout = setTimeout(() => {this.props.setValue(value)}, 0);
        }}
        {...this.props}
        />
    )
  }
}
export default HOC(Input);
