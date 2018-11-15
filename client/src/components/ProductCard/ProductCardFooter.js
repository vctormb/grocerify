import React from 'react';
import styled from 'styled-components';
import { Flex } from '@rebass/grid';

// styles
import { pxToRem } from '../../styles';

const Wrapper = styled(Flex)`
  padding: ${pxToRem(10)};
`;

class ProductCardFooter extends React.Component {
  render() {
    const { children, ...rest } = this.props;

    return (
      <Wrapper {...rest} mt="auto">
        {children}
      </Wrapper>
    );
  }
}

export default ProductCardFooter;
