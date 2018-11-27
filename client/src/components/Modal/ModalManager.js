import React from 'react';
import PropTypes from 'prop-types';

class ModalManager extends React.Component {
  state = {
    isOpen: false,
  };

  showModal = isOpen => {
    this.setState({
      isOpen,
    });
  };

  render() {
    const data = {
      ...this.state,
      showModal: this.showModal,
    };

    return this.props.children(data);
  }
}

ModalManager.propTypes = {
  isOpen: PropTypes.bool,
};

export default ModalManager;
