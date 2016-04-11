import React, { Component } from 'react';
import { HOC } from 'formsy-react';
import { SelectField } from 'material-ui/lib';
import objectAssign from 'object-assign';

class Input extends Component {
  componentWillReceiveProps(nextProps) {
    if (this.props.modelId != nextProps.modelId) nextProps.setValue(nextProps.value);
  };

  render() {
    return (
      <SelectField
        {...this.props}
        style={objectAssign({
          width: 250,
          display: "block"
        }, this.props.style)}
        fullWidth={true}
        maxHeight={300}
        onChange={(e, index, value) => this.props.setValue(value)}
        defaultValue={this.props.value}
        value={this.props.getValue()}
        >
        {this.props.children}
      </SelectField>
    )
  }
}
export default HOC(Input);
