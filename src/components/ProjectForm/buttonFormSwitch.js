import React, {Component, PropTypes} from 'react';
import ui from 'redux-ui';
import ProjectForm from '../ProjectForm/nameForm';
import {FlatButton} from 'material-ui/lib';
import CreateNewFolder from 'material-ui/lib/svg-icons/file/create-new-folder';

class ButtonFormSwitch extends Component {
  static propTypes = {
    onNew: PropTypes.func,
    ui: PropTypes.object,
    updateUI: PropTypes.func
  };

  render() {
    return (this.props.ui.showForm ?
      (
        <li key="project-listing-item-new" className="project-listing-item-new">
          <ProjectForm onSubmit={this.props.onNew} onBlur={() => this.props.updateUI("showForm", false)}/>
        </li>
      ) : (
        <li key="project-listing-item-new-button">
          <div className="actions">
            <FlatButton
              className="item-button"
              label="New project"
              fullWidth={true}
              onClick={(e) => this.props.updateUI("showForm", true)}
              icon={<CreateNewFolder />}
            />
          </div>
        </li>
      )
    )
  };
}


export default ui({state: {showForm: false}})(ButtonFormSwitch);
