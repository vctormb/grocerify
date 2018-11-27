import React from 'react';
import ReactDOM from 'react-dom';

const modalRootId = 'modal-root';
const modalRoot = document.getElementById(modalRootId);

let createdModalRoot;

class Portal extends React.Component {
  constructor(props) {
    super(props);
    this.el = document.createElement('div');

    if (!modalRoot) {
      createdModalRoot = document.createElement('div');
      createdModalRoot.setAttribute('id', modalRootId);
      document.body.appendChild(createdModalRoot);
    }

    createdModalRoot.appendChild(this.el);
  }

  componentWillUnmount() {
    if (modalRoot) {
      modalRoot.removeChild(this.el);
    }
  }

  render() {
    return ReactDOM.createPortal(this.props.children, this.el);
  }
}

export default Portal;
