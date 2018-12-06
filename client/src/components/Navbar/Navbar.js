import React from 'react';
import styled from 'styled-components';
import { Flex } from '@rebass/grid';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

// graphql
import { Query } from 'react-apollo';
import { queries } from '../../graphql';
// components
import Container from '../Container';
import Button from '../Button';
import LinkButton from '../LinkButton';
import IconButton from '../IconButton';
import Badge from '../Badge';
import { withLoginModal } from '../LoginModal';
import withApp from '../withApp';
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
  cursor: pointer;
`;

class Navbar extends React.Component {
  goToCartScreen = () => {
    const { withApp } = this.props;

    if (!withApp.isLoggedIn) {
      this.props.withLoginModal.showModal(true);
    } else {
      this.props.history.push('/cart');
    }
  };

  renderLoginOrUser() {
    const { isGreenTheme, withApp } = this.props;

    if (withApp.isLoggedIn) {
      return (
        <Button appearance="ghostSuccess" color={!isGreenTheme ? 'v3' : null}>
          {withApp.user.name}
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

  renderBadge() {
    const { withApp } = this.props;

    if (!withApp.isLoggedIn) return null;

    return (
      <Query query={queries.COUNT_USER_ORDERED_PRODUCTS}>
        {({ data }) => {
          const hasData = data && Object.keys(data).length;

          return (
            <Badge
              top="-5px"
              count={hasData && data.countUserOrderedProducts}
            />
          );
        }}
      </Query>
    );
  }

  render() {
    const { isGreenTheme } = this.props;

    return (
      <Wrapper isGreenTheme={isGreenTheme}>
        <Container as={Flex} alignItems="center" flex="1">
          <Brand onClick={() => this.props.history.push('/')}>Grocerify</Brand>

          {this.renderLoginOrUser()}

          <IconButton
            appearance="ghostSuccess"
            icon="shopping-cart"
            color={!isGreenTheme ? 'v3' : null}
            onClick={this.goToCartScreen}
          >
            {this.renderBadge()}
          </IconButton>
        </Container>
      </Wrapper>
    );
  }
}

const enhance = compose(
  withRouter,
  withApp,
  withLoginModal
);

export default enhance(Navbar);
