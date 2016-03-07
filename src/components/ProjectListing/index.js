import React, {PropTypes} from 'react';
import ProjectItem from './_item';

const ProjectListing = ({tree, isLoading, onUnfold, onDelete}) => {

  const getProjectChildren = (project, index = 0, depth = 0) => {
    if (!project) return;
    let children = "";
    if (project.opened && project.children.length > 0) {
      children = (<ul>
        {project.children.map((item, i) => {
          return getProjectChildren(item, i + 1, depth + 1);
        })}
      </ul>);
    }

    return (
      <ProjectItem
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
    <div>
      <ul>{list}</ul>
      <span>{isLoading ? "Loading" : ""}</span>
    </div>
  );
};

//Note that this odd style is utilized for propType validation for now. Must be defined *after*
//the component is defined, which is why it's separate and down here.
ProjectListing.propTypes = {
  tree: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
  onUnfold: PropTypes.func,
  onDelete: PropTypes.func
};

export default ProjectListing;
