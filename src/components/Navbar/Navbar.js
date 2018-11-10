import React from 'react';
import styled from 'styled-components';
import { Flex } from '@rebass/grid';
import { withRouter } from 'react-router-dom';

// components
import {
  Container,
  Button,
  LinkButton,
  IconButton,
  Badge,
} from '../../components';

// styles
import { pxToRem } from '../../styles';

const Wrapper = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  width: 100%;
  height: 64px;
  padding: ${pxToRem(20)} 0;
  border-bottom: ${p => `1px solid ${p.theme.colors.v5}`};
  background-color: ${p => p.theme.colors.v3};
  background-image: ${({ isLoginScreen, theme }) =>
    isLoginScreen
      ? 'none'
      : `linear-gradient(to right, ${theme.colors.v7}, #24ab56)`};
  box-shadow: 0 1px 9px 0 rgba(0, 0, 0, 0.2);
  color: ${({ isLoginScreen, theme }) =>
    isLoginScreen ? 'inherit' : theme.colors.v3};
  z-index: 30;
`;

const Brand = styled.span`
  flex: 1;
  font-weight: 700;
`;

const Navbar = ({ isLoginScreen }) => (
  <Wrapper isLoginScreen={isLoginScreen}>
    <Container as={Flex} alignItems="center" flex="1">
      <Brand>Grocerify</Brand>
      <Button
        as={LinkButton}
        to="/login"
        appearance="ghost"
        color={!isLoginScreen ? 'v3' : null}
      >
        Login
      </Button>

      <IconButton
        as={LinkButton}
        to="/cart"
        appearance="ghostSuccess"
        icon="shopping-cart"
        color={!isLoginScreen ? 'v3' : null}
      >
        <Badge top="-5px" count={0} />
      </IconButton>
    </Container>
  </Wrapper>
);

export default withRouter(Navbar);
