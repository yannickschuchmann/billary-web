import React, {Component, PropTypes} from 'react';
import ui from 'redux-ui';
import {FlatButton} from 'material-ui/lib';


class TimeEntryForm extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    entry: PropTypes.object,
    ui: PropTypes.object,
    updateUI: PropTypes.func
  };

  render() {
    return (
      <div className="time-entry-form">
        {this.props.entry ? "is da" : "nop"}
      </div>
    );
  };
}


export default ui({state: {}})(TimeEntryForm);
