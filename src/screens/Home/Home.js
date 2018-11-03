import React from 'react';

// components
import { ScreenBox, Container, Row, Col, ProductCard } from '../../components';

const items = [1, 1, 1, 1, 1, 1, 1, 1];

class Home extends React.Component {
  state = {};
  render() {
    return (
      <ScreenBox>
        <Container>
          <Row flexWrap="wrap">
            {items.map((_, i) => (
              <Col key={i} flex={['1 1 100%', '0 1 33.33%']}>
                <ProductCard>
                  <ProductCard.Image />
                  <ProductCard.Body />
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
