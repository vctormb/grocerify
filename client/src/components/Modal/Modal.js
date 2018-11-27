import React from 'react';
import styled from 'styled-components';
import { Box } from '@rebass/grid';

// components
import Card from '../Card';
import Portal from '../Portal';

// styles
import { pxToRem, media } from '../../styles';

const Backdrop = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  padding-top: 100px;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 9998;
`;

const Wrapper = styled.div`
  padding: ${pxToRem(30)};
  background-color: ${p => p.theme.colors.v3};
  max-width: 400px;
  margin: 0 auto;
  z-index: 9999;

  ${media.sm`
		padding: ${pxToRem(60)};
	`};
`;

class Modal extends React.Component {
  render() {
    if (!this.props.isOpen) return null;

    return (
      <Portal>
        <Backdrop onClick={() => this.props.showModal(false)}>
          <Wrapper as={Card} onClick={e => e.stopPropagation()}>
            {this.props.children}
          </Wrapper>
        </Backdrop>
      </Portal>
    );
  }
}

export default Modal;
