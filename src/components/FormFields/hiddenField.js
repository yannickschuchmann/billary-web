import React, { Component } from 'react';
import { HOC } from 'formsy-react';

class Input extends Component {

  handleChange(event) {
    this.props.setValue(event.target.value)
  }

  render() {
    return (
      <input
        {...this.props}
        type="hidden"
        onChange={this.handleChange.bind(this)}
        value={this.props.getValue()} />
    )
  }
}
export default HOC(Input);
