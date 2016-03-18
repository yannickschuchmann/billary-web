import React, {Component, PropTypes} from 'react';
import {TextField, IconButton} from 'material-ui/lib';
import CheckCircle from 'material-ui/lib/svg-icons/action/done';
import ui from 'redux-ui';

//This is a stateless functional component. (Also known as pure or dumb component)
//More info: https://facebook.github.io/react/blog/2015/10/07/react-v0.14.html#stateless-functional-components
//And https://medium.com/@joshblack/stateless-components-in-react-0-14-f9798f8b992d
//Props are being destructured below to extract the savings object to shorten calls within component.

class ProjectNameForm extends Component {

  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    onBlur: PropTypes.func,
    ui: PropTypes.object,
    updateUI: PropTypes.func
  }

  componentDidMount() {
    this.refs.nameField.focus();
  };

  handleSubmit(e) {
    e.preventDefault();
    this.props.onSubmit(this.props.ui.name);
    this.props.updateUI("name", "");
    return false;
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)} className="project-form">
        <TextField
          ref="nameField"
          fullWidth={true}
          hintText="Project name"
          value={this.props.ui.name}
          onBlur={this.props.onBlur}
          onChange={(e) => {this.props.updateUI("name", e.target.value)}}
        />
      </form>
    );
  }
}

export default ui({state: { name: "" }})(ProjectNameForm);
