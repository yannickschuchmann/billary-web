import React, {PropTypes} from 'react';

const ProjectItem = ({item, onUnfold, onDelete, children}) => {
  return (
    <li onClick={(e) => {e.stopPropagation(); onUnfold()}}>
      <span>
        <strong>{item.children.length ? item.opened ? "-" : "+" : "."}</strong>
        {item.name}
      </span>
      <span onClick={(e) => {e.stopPropagation(); onDelete()}}>delete</span>
      {children}
    </li>
  );
}

ProjectItem.propTypes = {
  onUnfold: PropTypes.func,
  onDelete: PropTypes.func,
  item: PropTypes.object.isRequired,
  children: PropTypes.node
}

export default ProjectItem;
