import React from 'react';
import PropTypes from 'prop-types';

class ModalManager extends React.Component {
  state = {
    isOpen: false,
  };

  componentDidMount() {
    if (this.props.isOpen) {
      this.setState({
        isOpen: this.props.isOpen,
      });
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.isOpen !== this.props.isOpen) {
      this.setState({
        isOpen: this.props.isOpen,
      });
    }
  }

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
