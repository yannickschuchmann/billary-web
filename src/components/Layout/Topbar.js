import React, {PropTypes} from 'react';

const Topbar = ({children}) => {
  return (
    <div className="topbar">
      {children}      
    </div>
  );
}

Topbar.propTypes = {
  children: PropTypes.node
}

export default Topbar;
