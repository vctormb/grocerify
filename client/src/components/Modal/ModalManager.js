import React from 'react';
import PropTypes from 'prop-types';
import Portal from '../Portal';

class ModalManager extends React.Component {
  state = {
    isOpen: false,
  };

  componentDidUpdate(prevProps) {
    if (prevProps.isOpen !== this.state.isOpen) {
      this.setState({
        isOpen: this.props.isOpen,
      });
    }
  }

  activeModal = isOpen => {
    this.setState({
      isOpen,
    });
  };

  render() {
    return <Portal>{this.props.children(this.state)}</Portal>;
  }
}

ModalManager.propTypes = {
  isOpen: PropTypes.bool,
};

export default ModalManager;
