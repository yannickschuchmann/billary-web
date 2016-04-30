import React, {PropTypes} from 'react';
import classNames from 'classnames';
import ProjectItem from './_item';
import ProjectForm from '../ProjectForm/nameForm';
import ButtonFormSwitch from '../ProjectForm/buttonFormSwitch';
import {RefreshIndicator} from 'material-ui/lib';
import SettingsIcon from 'material-ui/lib/svg-icons/action/settings';

const ProjectListing = (props) => {
  const {tree, isFetching, onSelect, onSelectAndStart, onUnfold, selected, onEdit, onDelete, onNew} = props;

  const handleSelect = (id) => {
    if (onSelect) onSelect(id);
  };

  const handleSelectAndStart = (id) => {
    if (onSelectAndStart) onSelectAndStart(id);
  };

  const handleAssign = (projectId, e, index, value) => {
    props.onAssign({
      id: projectId,
      client_id: value
    });
  };

  const getProjectChildren = (project, index = 0, depth = 0) => {
    if (!project) return;
    let children = project.children.map((item, i) => {
      return getProjectChildren(item, i + 1, depth + 1);
    });
    return (
      <ProjectItem
        {...props}
        style={props.itemStyle}
        className={props.itemClassName}
        disableAssignField={depth > 0}
        showStartButton={false || props.showStartButton}
        isSelected={selected && selected.id == project.id}
        onSelect={handleSelect.bind(this, project.id)}
        onSelectAndStart={handleSelectAndStart.bind(this, project.id)}
        onUnfold={() => onUnfold(project.id)}
        onNew={(name) => onNew(name, project.id)}
        onEdit={() => onEdit(project.id)}
        onDelete={() => onDelete(project.id)}
        onAssign={handleAssign.bind(this)}
        key={depth + "|" + index}
        item={project}>
          {children}
      </ProjectItem>
    );
  };

  const list = tree.map((item, i) => {return getProjectChildren(item, i)});

  const header = props.showHeader ? (
    <div className="project-listing-header">
      <ul>
        <li className="col-unfold"></li>
        <li className="col-name">Name</li>
        <li className="col-open">Open</li>
        <li className="col-total">Total</li>
        {props.showStartButton ? <li className="col-start">Start</li> : ""}
        <li className="col-client">Client</li>
        <li className="col-actions"><SettingsIcon/></li>
      </ul>
    </div>
  ) : "";

  const newButton = props.showNewButton ? (
    <ButtonFormSwitch onNew={onNew} />
  ) : "";
  return (
    <div
      className={classNames("project-listing", props.className)}
      style={props.style}>
      {header}
      <ul>
        {list}
        {newButton}
      </ul>
    </div>
  );
};

//Note that this odd style is utilized for propType validation for now. Must be defined *after*
//the component is defined, which is why it's separate and down here.
ProjectListing.propTypes = {
  tree: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  selected: PropTypes.object,
  onSelect: PropTypes.func,
  onEdit: PropTypes.func,
  onUnfold: PropTypes.func,
  onDelete: PropTypes.func,
  onNew: PropTypes.func
};

export default ProjectListing;
