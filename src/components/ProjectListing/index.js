import React, {PropTypes} from 'react';
import ProjectItem from './_item';

const ProjectListing = ({tree, isFetching, onSelect, onUnfold, selected, onDelete}) => {

  const getProjectChildren = (project, index = 0, depth = 0) => {
    if (!project) return;
    let children = "";
    if (project.unfolded && project.children.length > 0) {
      children = (<ul>
        {project.children.map((item, i) => {
          return getProjectChildren(item, i + 1, depth + 1);
        })}
      </ul>);
    }

    return (
      <ProjectItem
        isSelected={selected.id == project.id}
        onSelect={() => onSelect(project.id)}
        onUnfold={() => {if (project.children.length) onUnfold(project.id)}}
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
      <ul>{list}</ul>
      <span>{isFetching ? "Loading" : ""}</span>
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
  onDelete: PropTypes.func
};

export default ProjectListing;
