import React from 'react';
import styled from 'styled-components';
import { Flex } from '@rebass/grid';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';

// graphql
import { Query } from 'react-apollo';
import { queries } from '../../graphql';
// components
import {
  ScreenBox,
  Container,
  ProductCard,
  Row,
  Col,
  Card,
  Button,
  ProductCardCartFooter,
  Icon,
  withApp,
} from '../../components';
// styles
import { media, colors } from '../../styles';

const ListItems = styled.div`
  border-bottom: ${p => `1px solid ${p.theme.colors.v6}`};
  overflow-y: auto;
  max-height: 400px;

  ${media.sm`
		border-bottom: none;
		margin-bottom: initial;
		padding-bottom: initial;
	`};
`;

const ProductCardCart = styled(ProductCard)`
  box-shadow: none;
  border-bottom: 1px solid #e1e1e1;

  &:last-child {
    border-bottom: none;
  }
`;

class Cart extends React.Component {
  render() {
    const { withApp } = this.props;

    return (
      <ScreenBox data-testid="cart-screen">
        <Container>
          <Row flexDirection={['column', 'column', 'row']}>
            <Query query={queries.USER_ORDER} fetchPolicy="network-only">
              {({ loading, error, data }) => {
                if (error) return `Error! ${error.message}`;
                if (loading) {
                  return (
                    <Flex justifyContent="center" flex="1" mb={6}>
                      <Icon
                        spin
                        icon="spinner2"
                        width="16"
                        height="16"
                        fill={colors.v4}
                      />
                    </Flex>
                  );
                }

                if (!data.userOrder.order.orderedProducts.length) {
                  return (
                    <Flex justifyContent="center" flex="1">
                      <strong>Your cart is empty!</strong>
                    </Flex>
                  );
                }

                return (
                  <React.Fragment>
                    <Col as={Flex} flex={[1, '0 1 50%']} flexDirection="column">
                      <Card>
                        <Card.Header>Your cart</Card.Header>
                        <Card.Body p={0}>
                          <ListItems>
                            {data.userOrder.order.orderedProducts.map(
                              (item, i) => (
                                <ProductCardCart
                                  rounded={false}
                                  p={0}
                                  horizontal
                                  key={i}
                                  mb={0}
                                >
                                  {pc => (
                                    <React.Fragment>
                                      <ProductCardCart.Image
                                        {...pc}
                                        imageUrl={item.product.imageUrl}
                                        rounded={false}
                                      />
                                      <ProductCardCart.Content>
                                        <ProductCardCart.Body
                                          title={item.product.title}
                                          price={item.product.price}
                                        />
                                        <ProductCardCart.Footer justifyContent="space-between">
                                          <ProductCardCartFooter
                                            orderedProductId={item.id}
                                            productId={item.product.id}
                                            quantity={item.quantity}
                                          />
                                        </ProductCardCart.Footer>
                                      </ProductCardCart.Content>
                                    </React.Fragment>
                                  )}
                                </ProductCardCart>
                              )
                            )}
                          </ListItems>
                        </Card.Body>
                      </Card>
                    </Col>

                    <Col flex={[1, '0 1 50%']}>
                      <Card mt={[4, 4, 0]} mb={[4, 4, 0]}>
                        <Card.Header>Details</Card.Header>
                        <Card.Body>
                          <Flex mt={3} justifyContent="space-between">
                            <strong>Total</strong> $
                            {' ' + data.userOrder.totalPrice.toFixed(2)}
                          </Flex>
                          <Flex flexDirection="column" mt={4}>
                            <Button
                              size="lg"
                              appearance="danger"
                              disabled={withApp.isBlocking}
                              onClick={() =>
                                this.props.history.push('/success')
                              }
                            >
                              Checkout
                            </Button>
                          </Flex>
                        </Card.Body>
                      </Card>
                      <Flex flexDirection="column" />
                    </Col>
                  </React.Fragment>
                );
              }}
            </Query>
          </Row>
        </Container>
      </ScreenBox>
    );
  }
}

const enhance = compose(
  withRouter,
  withApp
);

export default enhance(Cart);
