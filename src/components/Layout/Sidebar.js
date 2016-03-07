import React, {PropTypes} from 'react';

const Sidebar = ({children}) => {
  return (
    <div className="sidebar">
      {children}
    </div>
  );
}

Sidebar.propTypes = {
  children: PropTypes.node
}

export default Sidebar;
