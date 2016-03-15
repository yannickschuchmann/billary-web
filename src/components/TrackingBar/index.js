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
    trackingState: PropTypes.object,
    modalAppElement: PropTypes.element,
    onNew: PropTypes.func,
    onSelect: PropTypes.func,
    onUnfold: PropTypes.func,
    onDelete: PropTypes.func,
    onStart: PropTypes.func,
    onStop: PropTypes.func
  };

  componentDidMount() {
  };

  submitNewProject(name, parent_id=null) {
    this.props.postProject({name, parent_id});
  };

  onSelectClicked(e) {
    this.props.updateUI("isSelecting", true);
  };

  onSelected(id) {
    this.closeModal();
    this.props.onSelect(id);
  };

  closeModal() {
    this.props.updateUI("isSelecting", false);
  };

  render () {
    const currentStartedAt = this.props.currentTimeEntry.started_at;
    const timeSinceStartedAt = currentStartedAt ?
      Math.floor((new Date() - new Date(currentStartedAt)) / 1000) :
      0;

    const today = moment();

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
          <ProjectListing
            advanced={true}
            tree={this.props.trackingState.tree}
            selected={this.props.trackingState.selected}
            isFetching={this.props.trackingState.isFetching}
            onSelect={this.onSelected.bind(this)}
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
