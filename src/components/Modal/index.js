import React, {Component, PropTypes} from 'react';
import ModalContent from './_content.js';

class Modal extends Component {

  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func,
    className: PropTypes.string,
    children: PropTypes.node
  }

  handleKeydown(e, f) {
    if(e.keyCode == 27) this.props.onClose();
  };

  render() {
    const classNames = "modal" +
    (this.props.isOpen ? " modal-open" : " modal-closed") +
    (this.props.className.length ? " " + this.props.className : "");

    if (this.props.isOpen) {
      document.addEventListener("keydown", this.handleKeydown.bind(this), false);
    } else {
      document.removeEventListener("keydown", this.handleKeydown.bind(this), false);
    }

    return (
      <div className={classNames} onClick={this.props.onClose}>
        {this.props.isOpen ? (<ModalContent>{this.props.children}</ModalContent>) : ""}
      </div>
    );
  }
}


export default Modal;
