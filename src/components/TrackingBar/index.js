import React, {Component, PropTypes} from 'react';
import ui from 'redux-ui';
import SelectedProject from './SelectedProject';
import Modal from '../Modal';
import ProjectListing from '../ProjectListing';
import ProjectForm from '../ProjectForm';

class TrackingBar extends Component {
  static propTypes = {
    ui: PropTypes.object,
    updateUI: PropTypes.func,
    project: PropTypes.object,
    projectsState: PropTypes.object,
    modalAppElement: PropTypes.element,
    onNew: PropTypes.func,
    onSelect: PropTypes.func,
    onUnfold: PropTypes.func,
    onDelete: PropTypes.func
  };

  componentDidMount() {
  };

  submitNewProject(name, parent_id=null) {
    this.props.postProject({name, parent_id});
  };

  onSelectClicked(e) {
    this.props.updateUI("isSelecting", true);
  };

  closeModal() {
    this.props.updateUI("isSelecting", false);
  };

  render () {
    return (
      <div className="tracking-bar">
        <SelectedProject
          project={this.props.project}
          onClick={this.onSelectClicked.bind(this)} />
        <Modal
          className="modal-select-project"
          isOpen={this.props.ui.isSelecting}
          onClose={this.closeModal.bind(this)}>
          <input type="text" placeholder="Search project ... "/>

          <div>Search results</div>
          <ProjectListing
            tree={this.props.projectsState.tree}
            selected={this.props.projectsState.selected}
            isFetching={this.props.projectsState.isFetching}
            onSelect={this.props.onSelect}
            onUnfold={this.props.onUnfold}
            onDelete={this.props.onDelete}
            onNew={this.props.onNew} />
        </Modal>
      </div>
    )
  }
}

export default ui({
  state: {
    isSelecting: false
  }
})(TrackingBar);
