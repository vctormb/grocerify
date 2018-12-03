import React from 'react';
import styled from 'styled-components';
import { Flex } from '@rebass/grid';

// graphql
import { Query, Mutation } from 'react-apollo';
import { queries, mutations } from '../../graphql';
// components
import {
  ScreenBox,
  Container,
  ProductCard,
  Row,
  Col,
  Card,
  Button,
  QuantityField,
  Icon,
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
  deleteOrderedProduct = (deleteOrderedProduct, productId) => {
    deleteOrderedProduct({
      variables: {
        productId,
      },
    });
  };

  onCompletedDeletedProduct = (cache, { data: { deleteOrderedProduct } }) => {
    const { userOrder } = cache.readQuery({
      query: queries.USER_ORDER,
    });

    cache.writeQuery({
      query: queries.USER_ORDER,
      data: {
        userOrder: {
          ...userOrder,
          order: {
            ...userOrder.order,
            orderedProducts: userOrder.order.orderedProducts.filter(
              x => x.id !== deleteOrderedProduct.orderedProduct.id
            ),
          },
          totalPrice: deleteOrderedProduct.totalPrice,
        },
      },
    });
  };

  render() {
    return (
      <ScreenBox>
        <Container>
          <Row flexDirection={['column', 'column', 'row']}>
            <Query query={queries.USER_ORDER}>
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
                                          <Mutation
                                            mutation={
                                              mutations.DELETE_ORDERED_PRODUCT
                                            }
                                            update={
                                              this.onCompletedDeletedProduct
                                            }
                                          >
                                            {(
                                              deleteOrderedProduct,
                                              { loading }
                                            ) => (
                                              <Button
                                                size="xs"
                                                appearance="textSuccess"
                                                disabled={loading}
                                                onClick={() =>
                                                  this.deleteOrderedProduct(
                                                    deleteOrderedProduct,
                                                    item.product.id
                                                  )
                                                }
                                              >
                                                REMOVE
                                              </Button>
                                            )}
                                          </Mutation>
                                          <QuantityField
                                            count={item.quantity}
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
                            <strong>Total</strong> ${data.userOrder.totalPrice}
                          </Flex>
                          <Flex flexDirection="column" mt={4}>
                            <Button size="lg" appearance="danger">
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

export default Cart;
