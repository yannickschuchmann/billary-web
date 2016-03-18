import React, {Component, PropTypes} from 'react';
import ui from 'redux-ui';
import objectAssign from 'object-assign';
import {TextField, IconButton, SelectField, MenuItem} from 'material-ui/lib';
import CheckCircle from 'material-ui/lib/svg-icons/action/done';

//This is a stateless functional component. (Also known as pure or dumb component)
//More info: https://facebook.github.io/react/blog/2015/10/07/react-v0.14.html#stateless-functional-components
//And https://medium.com/@joshblack/stateless-components-in-react-0-14-f9798f8b992d
//Props are being destructured below to extract the savings object to shorten calls within component.

class ProjectForm extends Component {

  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    ui: PropTypes.object,
    updateUI: PropTypes.func,
    project: PropTypes.object,
    projects: PropTypes.array
  }

  componentWillMount() {
    this.props.updateUI("project", this.props.project);
  };

  componentDidMount() {
    this.refs.nameField.focus();
  };

  handleSubmit(e) {
    e.preventDefault();
    const project = this.props.ui.project;
    this.props.onSubmit(objectAssign({}, project, {
      parent_id: project.parent_id == -1 ? null : project.parent_id
    }));
    return false;
  };

  handleNameChange(e) {
    this.props.updateUI({
      project: objectAssign({}, this.props.ui.project, {
        name: e.target.value
      })
    });
  };

  handleProjectChange(e, index, value) {
    this.props.updateUI({
      project: objectAssign({}, this.props.ui.project, {
        parent_id: value
      })
    });
  };

  render() {
    const projectOptions = [(
      <MenuItem
        key={0}
        value={-1}
        primaryText={"-"} />
    )].concat(this.props.projects.map((project, i) => (
      <MenuItem
        key={i + 1}
        value={project.id}
        primaryText={project.name} />
    )));

    return (
      <form onSubmit={this.handleSubmit.bind(this)} className="project-form">
        <TextField
          ref="nameField"
          fullWidth={true}
          errorText={this.props.ui.errors.name}
          hintText="Name"
          value={this.props.ui.project.name}
          onChange={this.handleNameChange.bind(this)}
        />

        <SelectField
          fullWidth={true}
          errorText={this.props.ui.errors.parent}
          value={this.props.ui.project.parent_id}
          onChange={this.handleProjectChange.bind(this)}
          floatingLabelText="Choose Parent Project"
          errorStyle={{
            top: "100%",
            bottom: "auto",
            position: "absolute"
          }}
          >
          {projectOptions}
        </SelectField>
      </form>
    );
  }
}

export default ui({
  state: {
    project: {},
    errors: {
      name: "",
      parent: ""
    }
  }
})(ProjectForm);
