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
  Icon,
  InfiniteScroll,
  ProductCardAddToCart,
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
          <Query
            query={queries.PRODUCTS}
            variables={{ skip: 0, first: 12 }}
            notifyOnNetworkStatusChange
          >
            {({ loading, error, data, fetchMore }) => {
              if (error) return `Error! ${error.message}`;

              const hasData = data && Object.keys(data).length;

              return (
                <React.Fragment>
                  <Row flexWrap="wrap">
                    <InfiniteScroll
                      isLoading={loading}
                      onFetchData={() =>
                        this.fetchMoreData(fetchMore, data.products.length)
                      }
                    >
                      <React.Fragment>
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
                                        <ProductCardAddToCart
                                          product={product}
                                        />
                                      </ProductCard.Footer>
                                    </ProductCard.Content>
                                  </React.Fragment>
                                )}
                              </ProductCard>
                            </Col>
                          ))}
                      </React.Fragment>
                    </InfiniteScroll>
                  </Row>

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
              );
            }}
          </Query>
        </Container>
      </ScreenBox>
    );
  }
}

export default Home;
