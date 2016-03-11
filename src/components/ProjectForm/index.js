import React, {Component, PropTypes} from 'react';
import {TextField, RaisedButton} from 'material-ui/lib';
import CheckCircle from 'material-ui/lib/svg-icons/action/done';
import ui from 'redux-ui';

//This is a stateless functional component. (Also known as pure or dumb component)
//More info: https://facebook.github.io/react/blog/2015/10/07/react-v0.14.html#stateless-functional-components
//And https://medium.com/@joshblack/stateless-components-in-react-0-14-f9798f8b992d
//Props are being destructured below to extract the savings object to shorten calls within component.

class ProjectForm extends Component {

  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    ui: PropTypes.object,
    updateUI: PropTypes.func
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.onSubmit(this.props.ui.name);
    this.props.updateUI("name", "");
    return false;
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <TextField
          floatingLabelText="New project"
          hintText="Project name"
          value={this.props.ui.name}
          onChange={(e) => {this.props.updateUI("name", e.target.value)}}
        />
        <RaisedButton
          label="save"
          labelPosition="after"
          primary={true}
          icon={<CheckCircle/>}
          onClick={this.handleSubmit.bind(this)}
        />
      </form>
    );
  }
}

export default ui({state: { name: "" }})(ProjectForm);
