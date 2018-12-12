import React from 'react';
import styled from 'styled-components';
import { Flex, Box } from '@rebass/grid';
import { withRouter } from 'react-router-dom';

// graphql
import { Mutation } from 'react-apollo';
import { queries, mutations } from '../../graphql';
// components
import Modal from '../Modal';
import Input from '../Input';
import Button from '../Button';
import withApp from '../withApp';

const Form = styled.form`
  flex: 0 1 200px;
`;

const TitleWrapper = styled(Box)`
  text-align: center;
`;

class LoginModal extends React.Component {
  state = {
    email: '',
    password: '',
  };

  setInputValue = (name, value) => {
    this.setState({
      [name]: value,
    });
  };

  onSubmit = (e, login) => {
    const { email, password } = this.state;

    e.preventDefault();

    login({
      variables: {
        email,
        password,
      },
    });
  };

  onCompleted = data => {
    this.props.withApp.login(data.login.token);

    this.props.showModal(false);
  };

  onUpdate = (...args) => {
    if (this.props.location.pathname === '/') {
      this.findProductsToUpdateOrderedProduct(...args);
    }
  };

  findProductsToUpdateOrderedProduct(
    cache,
    {
      data: { login },
    }
  ) {
    const { products } = cache.readQuery({
      query: queries.PRODUCTS,
      variables: {
        first: 12,
        skip: 0,
      },
    });

    const checkExistsProductId = productId => {
      return login.user.order.orderedProducts.some(
        item => item.product.id === productId
      );
    };

    cache.writeQuery({
      query: queries.PRODUCTS,
      data: {
        products: products.map(item => {
          if (checkExistsProductId(item.id)) {
            return {
              ...item,
              userOrderedProduct: {
                ...item.userOrderedProduct,
                id: item.id,
                __typename: 'OrderedProduct',
              },
            };
          }

          return item;
        }),
      },
    });
  }

  renderError(error) {
    return error.graphQLErrors.map(({ message }, i) => (
      <TitleWrapper key={i} mb={3}>
        <strong>
          <small>{message}</small>
        </strong>
      </TitleWrapper>
    ));
  }

  render() {
    return (
      <Modal {...this.props}>
        <TitleWrapper mb={5}>
          <h3>You need to login first!</h3>
        </TitleWrapper>
        <Mutation
          mutation={mutations.LOGIN}
          onCompleted={this.onCompleted}
          update={this.onUpdate}
          errorPolicy="all"
        >
          {(login, { error, loading }) => (
            <Form onSubmit={e => this.onSubmit(e, login)}>
              {error && this.renderError(error)}
              <Flex flexDirection="column">
                <Box mb={3}>
                  <Input
                    placeholder="email"
                    p="1rem"
                    onChange={e => this.setInputValue('email', e.target.value)}
                  />
                </Box>
                <Box mb={4}>
                  <Input
                    placeholder="password"
                    type="password"
                    p="1rem"
                    onChange={e =>
                      this.setInputValue('password', e.target.value)
                    }
                  />
                </Box>
                <Button
                  data-testid="login-btn"
                  size="lg"
                  appearance="info"
                  disabled={loading}
                >
                  {loading ? 'loading...' : 'Login'}
                </Button>
              </Flex>
            </Form>
          )}
        </Mutation>
      </Modal>
    );
  }
}

export default withRouter(withApp(LoginModal));
