import React from 'react';
import { Flex } from '@rebass/grid';

// graphql
import { Query } from 'react-apollo';

// components
import {
  ScreenBox,
  Container,
  Row,
  Col,
  ProductCard,
  Button,
  Icon,
} from '../../components';

// utils
import { query } from '../../graphql';

class Home extends React.Component {
  render() {
    return (
      <ScreenBox>
        <Container>
          <Row flexWrap="wrap">
            <Query query={query.PRODUCTS}>
              {({ loading, error, data }) => {
                if (loading)
                  return (
                    <Flex justifyContent="center" flex="1">
                      <Icon spin icon="spinner2" width="16" height="16" />
                    </Flex>
                  );
                if (error) return `Error! ${error.message}`;

                return data.products.map((product, i) => (
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
                ));
              }}
            </Query>
          </Row>
        </Container>
      </ScreenBox>
    );
  }
}

export default Home;
