import React from 'react';
import styled from 'styled-components';
import { Flex } from '@rebass/grid';

// components
import { Container } from '../../components';

// styles
import { pxToRem, media } from '../../styles';

const Wrapper = styled.div`
  padding: ${pxToRem(20)} 0;
  border-bottom: ${p => `1px solid ${p.theme.colors.v5}`};
  background-color: ${p => p.theme.colors.v3};

  /* ${media.lg`
  	margin-bottom: ${pxToRem(60)};
	`}; */
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
