import React, {PropTypes} from 'react';
import ProjectItem from './_item';
import ProjectForm from '../ProjectForm';
import ButtonFormSwitch from '../ProjectForm/buttonFormSwitch';
import {RefreshIndicator} from 'material-ui/lib'


const ProjectListing = ({tree, isFetching, onSelect, onUnfold, selected, onDelete, onNew}) => {

  const getProjectChildren = (project, index = 0, depth = 0) => {
    if (!project) return;
    let children = project.children.map((item, i) => {
      return getProjectChildren(item, i + 1, depth + 1);
    });

    return (
      <ProjectItem
        isSelected={selected && selected.id == project.id}
        onNew={(name) => onNew(name, project.id)}
        onSelect={() => onSelect(project.id)}
        onUnfold={() => onUnfold(project.id)}
        onDelete={() => onDelete(project.id)}
        key={depth + "|" + index}
        item={project}>
          {children}
      </ProjectItem>
    );
  };

  const list = tree.map((item, i) => {return getProjectChildren(item, i)});
  return (
    <div className="project-listing">
      <ul>
        {list}
        <ButtonFormSwitch onNew={onNew} />
      </ul>
      <RefreshIndicator
        size={20}
        left={10}
        top={10}
        status={isFetching ? "loading" : "hide"}
      />
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
  onUnfold: PropTypes.func,
  onDelete: PropTypes.func,
  onNew: PropTypes.func
};

export default ProjectListing;
