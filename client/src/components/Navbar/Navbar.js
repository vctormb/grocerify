import React from 'react';
import styled from 'styled-components';
import { Flex } from '@rebass/grid';
import { withRouter } from 'react-router-dom';

// components
import Container from '../Container';
import Button from '../Button';
import LinkButton from '../LinkButton';
import IconButton from '../IconButton';
import Badge from '../Badge';
import { withLoginModal } from '../LoginModal';
import withAuth from '../withAuth';
// utils
import { getToken } from '../../utils';

// styles
import { pxToRem } from '../../styles';

const Wrapper = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  width: 100%;
  height: 64px;
  padding: ${pxToRem(20)} 0;
  background-color: ${p => p.theme.colors.v3};
  background-image: ${({ isLoginScreen, theme }) =>
    isLoginScreen
      ? 'none'
      : `linear-gradient(to right, ${theme.colors.v7}, #1b9649)`};
  box-shadow: 0 1px 9px 0 rgba(0, 0, 0, 0.2);
  color: ${({ isLoginScreen, theme }) =>
    isLoginScreen ? 'inherit' : theme.colors.v3};
  z-index: 30;
`;

const Brand = styled.span`
  flex: 1;
  font-weight: 700;
`;

class Navbar extends React.Component {
  goToCartScreen = () => {
    if (!getToken()) {
      this.props.withLoginModal.showModal(true);
    } else {
      this.props.history.push('/cart');
    }
  };

  renderLoginOrUser() {
    const { isLoginScreen, withAuth } = this.props;

    if (withAuth.isLoggedIn) {
      return (
        <Button appearance="ghostSuccess" color={!isLoginScreen ? 'v3' : null}>
          {withAuth.user.name}
        </Button>
      );
    }

    return (
      <Button
        as={LinkButton}
        to="/login"
        appearance="ghost"
        color={!isLoginScreen ? 'v3' : null}
      >
        Login
      </Button>
    );
  }

  render() {
    const { isLoginScreen } = this.props;

    return (
      <Wrapper isLoginScreen={isLoginScreen}>
        <Container as={Flex} alignItems="center" flex="1">
          <Brand>Grocerify</Brand>

          {this.renderLoginOrUser()}

          <IconButton
            appearance="ghostSuccess"
            icon="shopping-cart"
            color={!isLoginScreen ? 'v3' : null}
            onClick={this.goToCartScreen}
          >
            <Badge top="-5px" count={0} />
          </IconButton>
        </Container>
      </Wrapper>
    );
  }
}

export default withRouter(withAuth(withLoginModal(Navbar)));
