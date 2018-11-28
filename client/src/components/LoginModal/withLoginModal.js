import React from 'react';

// components
import Modal from '../Modal';
import LoginModal from '.';

const withLoginModal = Component => {
  return class extends React.Component {
    render() {
      return (
        <Modal.Manager>
          {modal => (
            <React.Fragment>
              <LoginModal {...modal} />
              <Component {...this.props} withLoginModal={modal} />
            </React.Fragment>
          )}
        </Modal.Manager>
      );
    }
  };
};

export default withLoginModal;
