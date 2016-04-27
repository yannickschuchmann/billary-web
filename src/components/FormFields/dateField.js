import React, { Component } from 'react';
import { HOC } from 'formsy-react';
import { DatePicker } from 'material-ui/lib';
import objectAssign from 'object-assign';

class Input extends Component {
  render() {
    return (
      <DatePicker
        {...this.props}
        autoOk={true}
        style={objectAssign({
          width: 250,
          display: "block"
        }, this.props.style)}
        fullWidth={true}
        maxHeight={300}
        onChange={(e, value) => this.props.setValue(value)}
        value={new Date(this.props.getValue())}
        />
    )
  }
}
export default HOC(Input);
