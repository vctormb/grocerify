import React from 'react';
import PropTypes from 'prop-types';
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
        <Title>{this.props.title}</Title>
        <Box mt={2}>$ {this.props.price}</Box>
      </Wrapper>
    );
  }
}

ProductCardBody.propTypes = {
  title: PropTypes.string,
  price: PropTypes.number,
};

export default ProductCardBody;
