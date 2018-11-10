import React from 'react';
import styled from 'styled-components';
import { Flex } from '@rebass/grid';

// components
import {
  ScreenBox,
  Container,
  ProductCard,
  Row,
  Col,
  Card,
} from '../../components';
// styles
import { media } from '../../styles';

const items = [1, 1, 1, 1, 1, 1, 1, 1];

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
  state = {};
  render() {
    return (
      <ScreenBox>
        <Container>
          <Row flexDirection={['column', 'column', 'row']}>
            <Col as={Flex} flex={[1, '0 1 50%']} flexDirection="column">
              <Card>
                <Card.Header>Your cart</Card.Header>
                <ListItems>
                  {items.map((_, i) => (
                    <ProductCardCart horizontal key={i} mb={0}>
                      {pc => (
                        <React.Fragment>
                          <ProductCardCart.Image {...pc} />
                          <ProductCardCart.Body />
                        </React.Fragment>
                      )}
                    </ProductCardCart>
                  ))}
                </ListItems>
              </Card>
            </Col>
            <Col flex={[1, '0 1 50%']}>
              <div style={{ height: '200px', width: '200px' }}>foo</div>
            </Col>
          </Row>
        </Container>
      </ScreenBox>
    );
  }
}

export default Cart;
