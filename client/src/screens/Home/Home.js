import React from 'react';
import { Flex } from '@rebass/grid';

// graphql
import { Query } from 'react-apollo';
import { queries } from '../../graphql';

// components
import {
  ScreenBox,
  Container,
  Row,
  Col,
  ProductCard,
  Button,
  Icon,
  InfiniteScroll,
  Modal,
} from '../../components';

// styles
import { colors } from '../../styles';

class Home extends React.Component {
  fetchMoreData = (fetchMore, dataLength) => {
    fetchMore({
      variables: {
        skip: dataLength,
        first: 12,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return Object.assign({}, prev, {
          products: [...prev.products, ...fetchMoreResult.products],
        });
      },
    });
  };

  render() {
    return (
      <ScreenBox>
        <Container>
          <Row flexWrap="wrap">
            <Query
              query={queries.PRODUCTS}
              variables={{ skip: 0, first: 12 }}
              notifyOnNetworkStatusChange
            >
              {({ loading, error, data, fetchMore }) => {
                {
                  /* if (error) return `Error! ${error.message}`; */
                }

                const hasData = data && Object.keys(data).length;

                return (
                  <InfiniteScroll
                    isLoading={loading}
                    onFetchData={() =>
                      this.fetchMoreData(fetchMore, data.products.length)
                    }
                  >
                    <React.Fragment>
                      <Modal.Manager>
                        {modal => (
                          <React.Fragment>
                            <Flex>
                              <Modal {...modal} />
                              <button onClick={() => modal.activeModal(true)}>
                                click
                              </button>
                            </Flex>
                          </React.Fragment>
                        )}
                      </Modal.Manager>

                      {!!hasData &&
                        data.products.map((product, i) => (
                          <Col
                            key={i}
                            as={Flex}
                            flex={['1 1 100%', '0 1 33.33%', '0 1 25%']}
                          >
                            <ProductCard>
                              {pc => (
                                <React.Fragment>
                                  <ProductCard.Image
                                    {...pc}
                                    imageUrl={product.imageUrl}
                                  />
                                  <ProductCard.Content>
                                    <ProductCard.Body
                                      title={product.title}
                                      price={product.price}
                                    />
                                    <ProductCard.Footer justifyContent="center">
                                      <Button
                                        appearance="ghostSuccess"
                                        icon="shopping-cart"
                                      >
                                        ADD TO CART
                                      </Button>
                                    </ProductCard.Footer>
                                  </ProductCard.Content>
                                </React.Fragment>
                              )}
                            </ProductCard>
                          </Col>
                        ))}

                      {loading && (
                        <Flex justifyContent="center" flex="1" mb={6}>
                          <Icon
                            spin
                            icon="spinner2"
                            width="16"
                            height="16"
                            fill={colors.v4}
                          />
                        </Flex>
                      )}
                    </React.Fragment>
                  </InfiniteScroll>
                );
              }}
            </Query>
          </Row>
        </Container>
      </ScreenBox>
    );
  }
}

export default Home;
