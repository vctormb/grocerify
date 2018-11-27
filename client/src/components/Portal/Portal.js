import React from 'react';
import ReactDOM from 'react-dom';

const modalRootId = 'modal-root';
let modalRoot;

class Portal extends React.Component {
  constructor(props) {
    super(props);
    this.el = document.createElement('div');

    if (!modalRoot) {
      modalRoot = document.createElement('div');
      modalRoot.setAttribute('id', modalRootId);
      document.body.appendChild(modalRoot);
    }

    modalRoot.appendChild(this.el);
  }

  componentWillUnmount() {
    modalRoot.removeChild(this.el);
  }

  render() {
    return ReactDOM.createPortal(this.props.children, this.el);
  }
}

export default Portal;
