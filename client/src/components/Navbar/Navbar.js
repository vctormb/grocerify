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
  background-image: ${({ isGreenTheme, theme }) =>
    isGreenTheme
      ? 'none'
      : `linear-gradient(to right, ${theme.colors.v7}, #1b9649)`};
  box-shadow: 0 1px 9px 0 rgba(0, 0, 0, 0.2);
  color: ${({ isGreenTheme, theme }) =>
    isGreenTheme ? 'inherit' : theme.colors.v3};
  z-index: 30;
`;

const Brand = styled.span`
  flex: 1;
  font-weight: 700;
`;

class Navbar extends React.Component {
  goToCartScreen = () => {
    const { withAuth } = this.props;

    if (!withAuth.isLoggedIn) {
      this.props.withLoginModal.showModal(true);
    } else {
      this.props.history.push('/cart');
    }
  };

  renderLoginOrUser() {
    const { isGreenTheme, withAuth } = this.props;

    if (withAuth.isLoggedIn) {
      return (
        <Button appearance="ghostSuccess" color={!isGreenTheme ? 'v3' : null}>
          {withAuth.user.name}
        </Button>
      );
    }

    return (
      <Button
        as={LinkButton}
        to="/login"
        appearance="ghost"
        color={!isGreenTheme ? 'v3' : null}
      >
        Login
      </Button>
    );
  }

  render() {
    const { isGreenTheme } = this.props;

    return (
      <Wrapper isGreenTheme={isGreenTheme}>
        <Container as={Flex} alignItems="center" flex="1">
          <Brand>Grocerify</Brand>

          {this.renderLoginOrUser()}

          <IconButton
            appearance="ghostSuccess"
            icon="shopping-cart"
            color={!isGreenTheme ? 'v3' : null}
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
