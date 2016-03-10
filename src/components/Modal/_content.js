import React, {Component, PropTypes} from 'react';

const ModalContent = ({children}) => {
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="modal-content">{children}</div>
  );
}

ModalContent.propTypes = {
  children: PropTypes.node.isRequired
}

export default ModalContent;
