import React, {PropTypes} from 'react';

const ProjectItem = ({item, onSelect, onUnfold, onDelete, children}) => {
  return (
    <li onClick={(e) => {e.stopPropagation(); onSelect()}}>
      <strong onClick={(e) => {e.stopPropagation(); onUnfold()}}>{item.children.length ? item.opened ? "-" : "+" : "."}</strong>
      <span>
        {item.name}
      </span>
      <span onClick={(e) => {e.stopPropagation(); onDelete()}}>delete</span>
      {children}
    </li>
  );
}

ProjectItem.propTypes = {
  onSelect: PropTypes.func,
  onUnfold: PropTypes.func,
  onDelete: PropTypes.func,
  item: PropTypes.object.isRequired,
  children: PropTypes.node
}

export default ProjectItem;
