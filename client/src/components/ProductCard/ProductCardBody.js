import React from 'react';
import styled from 'styled-components';
import { Flex, Box } from '@rebass/grid';

// styles
import { pxToRem } from '../../styles';

const Wrapper = styled(Flex)`
  flex: 1;
  padding: ${pxToRem(10)};
  font-size: ${pxToRem(13)};
`;

const Title = styled.div`
  font-weight: 600;
  overflow: hidden;
`;

class ProductCardBody extends React.Component {
  render() {
    return (
      <Wrapper flexDirection="column">
        <Title>Cereal Fruity Pebbles 50% off! Buy it now</Title>
        <Box mt={2}>R$ 5,50</Box>
      </Wrapper>
    );
  }
}

export default ProductCardBody;