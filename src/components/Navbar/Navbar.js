import React from 'react';
import styled from 'styled-components';
import { Flex } from '@rebass/grid';

// components
import { Container } from '../../components';

// styles
import { pxToRem } from '../../styles';

const Wrapper = styled.div`
  padding: ${pxToRem(20)} 0;
  margin-bottom: ${pxToRem(60)};
  border-bottom: ${p => `1px solid ${p.theme.colors.v5}`};
`;

const Navbar = props => (
  <Wrapper>
    <Container as={Flex} justifyContent="space-between">
      <strong>Grocerify</strong>
      <span>Cart</span>
    </Container>
  </Wrapper>
);

export default Navbar;
