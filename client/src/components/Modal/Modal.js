import React from 'react';
import styled from 'styled-components';
import { Transition } from 'react-transition-group';

// components
import Card from '../Card';
import Portal from '../Portal';
import Container from '../Container';
import Backdrop from '../Backdrop';

// styles
import { pxToRem, media } from '../../styles';

const duration = 220;
const applyTransition = state => {
  switch (state) {
    case 'entering':
      return `
        transform: scale(0.6);
        opacity: 0 ;
      `;

    case 'entered':
      return `
        transform: scale(1);
        opacity: 1;
      `;

    case 'exiting':
      return `
        transform: scale(0.6);
        opacity: 0 ;
      `;

    default:
      return null;
  }
};

const Wrapper = styled.div`
  padding: ${pxToRem(30)};
  background-color: ${p => p.theme.colors.v3};
  max-width: 400px;
  margin: 0 auto;
  z-index: 9999;

  ${({ transitionState }) => applyTransition(transitionState)};
  transition: ${`all ${duration}ms ease-in-out`};

  ${media.sm`
		padding: ${pxToRem(60)};
	`};
`;

class Modal extends React.Component {
  render() {
    return (
      <Portal>
        <Backdrop
          show={this.props.isOpen}
          onClick={() => this.props.showModal(false)}
        >
          <Transition in={this.props.isOpen} timeout={duration} appear={true}>
            {transitionState => (
              <Container>
                <Wrapper
                  transitionState={transitionState}
                  as={Card}
                  onClick={e => e.stopPropagation()}
                >
                  {this.props.children}
                </Wrapper>
              </Container>
            )}
          </Transition>
        </Backdrop>
      </Portal>
    );
  }
}

export default Modal;
