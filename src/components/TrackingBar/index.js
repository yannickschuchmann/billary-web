import React, {Component, PropTypes} from 'react';
import ui from 'redux-ui';
import SelectedProject from './SelectedProject';
import Modal from '../Modal';
import ProjectListing from '../ProjectListing';
import ProjectForm from '../ProjectForm';
import TrackingCounter from '../TrackingCounter';
import {moment} from '../../businessLogic/calendarHelper';

import TrackingControls from '../TrackingControls';

class TrackingBar extends Component {
  static propTypes = {
    ui: PropTypes.object,
    updateUI: PropTypes.func,
    project: PropTypes.object,
    currentTimeEntry: PropTypes.object,
    tracking: PropTypes.object,
    modalAppElement: PropTypes.element,
    onNew: PropTypes.func,
    onSelect: PropTypes.func,
    onUnfold: PropTypes.func,
    onEdit: PropTypes.func,
    onDelete: PropTypes.func,
    onStart: PropTypes.func,
    onStop: PropTypes.func
  };

  componentDidMount() {
  };

  componentWillReceiveProps(nextProps) {
    const { isFetching, projects } = nextProps.tracking;
    const { isFetching: wasFetching } = this.props.tracking;
    if (wasFetching && !isFetching && projects.length == 0) {
      this.props.updateUI("isSelecting", true);
    }
  };

  submitNewProject(name, parent_id=null) {
    this.props.postProject({name, parent_id});
  };

  submitEditProject(project) {
    this.props.onEdit(project);
    this.props.updateUI("editProjectId", null);
  };

  onSelectClicked(e) {
    this.props.updateUI("isSelecting", true);
  };

  onSelected(id) {
    this.closeModal();
    this.props.onSelect(id);
  };

  handleSelectAndStart(id) {
    this.closeModal();
    this.props.onSelectAndStart(id);
  };

  onEdit(id) {
    this.props.updateUI("editProjectId", id);
  }

  closeModal() {
    this.props.updateUI("isSelecting", false);
  };

  render () {
    const currentStartedAt = this.props.currentTimeEntry.started_at;
    const timeSinceStartedAt = currentStartedAt ?
      Math.floor((new Date() - new Date(currentStartedAt)) / 1000) :
      0;
    const today = moment();

    let modalContent = "";
    if (this.props.ui.editProjectId) {
      modalContent = (
        <ProjectForm
          onSubmit={this.submitEditProject.bind(this)}
          projects={this.props.tracking.projects}
          project={this.props.tracking.projectsById[this.props.ui.editProjectId]} />
      );
    } else {
      modalContent = (<ProjectListing
        showStartButton={true}
        showNewButton={true}
        tree={this.props.tracking.tree}
        selected={this.props.tracking.selected}
        isFetching={this.props.tracking.isFetching}
        onSelect={this.onSelected.bind(this)}
        onSelectAndStart={this.handleSelectAndStart.bind(this)}
        onUnfold={this.props.onUnfold}
        onEdit={this.onEdit.bind(this)}
        onDelete={this.props.onDelete}
        onNew={this.props.onNew} />)
    }

    return (
      <div className="tracking-bar">
        <div className="today-icon">
          {today.format('DD')}
          {today.format('MMM')}
        </div>
        <SelectedProject
          project={this.props.project}
          onClick={this.onSelectClicked.bind(this)} />

        <TrackingCounter
          className="tracking-counter"
          duration={timeSinceStartedAt}
          running={!!currentStartedAt} />

        <TrackingControls
          className="tracking-controls"
          running={!!currentStartedAt}
          onStart={this.props.onStart}
          onStop={this.props.onStop} />
        <Modal
          className="modal-select-project"
          isOpen={this.props.ui.isSelecting}
          onClose={this.closeModal.bind(this)}>
          {modalContent}
        </Modal>
      </div>
    )
  }
}

export default ui({
  state: {
    isSelecting: false,
    editProjectId: null
  }
})(TrackingBar);
