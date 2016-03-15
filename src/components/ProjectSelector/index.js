import React, {PropTypes} from 'react';
import ProjectItem from './_item';

const ProjectSelector = ({tree, onSelect, onUnfold, selectedId}) => {

  const getProjectChildren = (project, index = 0, depth = 0) => {
    if (!project) return;
    let children = project.children.map((item, i) => {
      return getProjectChildren(item, i + 1, depth + 1);
    });

    return (
      <ProjectItem
        isSelected={selectedId == project.id}
        onSelect={() => onSelect(project.id)}
        onUnfold={() => onUnfold(project.id)}
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
      </ul>
    </div>
  );
};

//Note that this odd style is utilized for propType validation for now. Must be defined *after*
//the component is defined, which is why it's separate and down here.
ProjectSelector.propTypes = {
  tree: PropTypes.array.isRequired,
  selectedId: PropTypes.number,
  onSelect: PropTypes.func,
  onUnfold: PropTypes.func
};

export default ProjectSelector;
