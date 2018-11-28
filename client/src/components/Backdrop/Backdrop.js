import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Transition } from 'react-transition-group';

const duration = 220;
const applyTransition = state => {
  switch (state) {
    case 'entering':
      return `
        opacity: 0 ;
      `;

    case 'entered':
      return `
        opacity: 1;
      `;

    case 'exiting':
      return `
        opacity: 0 ;
      `;

    default:
      return null;
  }
};

const Backdrop = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  padding-top: 100px;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 9998;

  ${({ transitionState }) => applyTransition(transitionState)};
  transition: ${`all ${duration}ms ease-in-out`};
`;

const Component = ({ children, style, show, ...rest }) => (
  <Transition in={show} timeout={duration} appear={true} unmountOnExit>
    {transitionState => (
      <Backdrop {...rest} transitionState={transitionState}>
        {children}
      </Backdrop>
    )}
  </Transition>
);

Component.propTypes = {
  show: PropTypes.bool,
};

export default Component;
