import React from 'react';
import { Flex } from '@rebass/grid';

// components
import {
  ScreenBox,
  Container,
  Row,
  Col,
  ProductCard,
  Button,
} from '../../components';

const items = [1, 1, 1, 1, 1, 1, 1, 1];

class Home extends React.Component {
  state = {};
  render() {
    return (
      <ScreenBox>
        <Container>
          <Row flexWrap="wrap">
            {items.map((_, i) => (
              <Col
                key={i}
                as={Flex}
                flex={['1 1 100%', '0 1 33.33%', '0 1 25%']}
              >
                <ProductCard>
                  {pc => (
                    <React.Fragment>
                      <ProductCard.Image {...pc} />
                      <ProductCard.Content>
                        <ProductCard.Body />
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
          </Row>
        </Container>
      </ScreenBox>
    );
  }
}

export default Home;
