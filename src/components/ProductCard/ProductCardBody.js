import React from 'react';
import styled from 'styled-components';

// styles
import { pxToRem } from '../../styles';

const Wrapper = styled.div`
  flex: 1;
  padding: ${pxToRem(10)};
  font-size: ${pxToRem(13)};
`;

const Title = styled.div`
  font-weight: 600;
`;

const Price = styled.div`
  padding-top: ${pxToRem(10)};
`;

class ProductCardBody extends React.Component {
  state = {};
  render() {
    return (
      <Wrapper>
        <Title>Cereal Fruity Pebbles</Title>
        <Price>R$ 5,50</Price>
      </Wrapper>
    );
  }
}

export default ProductCardBody;
