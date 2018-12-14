import React from 'react';
import { Flex, Box } from '@rebass/grid';
import styled from 'styled-components';

// components
import { Container, Card } from '../../components';
// screens
import Form from './Form';
// styles
import { GlobalStyle, pxToRem, media } from '../../styles';

const Wrapper = styled(Box)`
  padding: ${pxToRem(30)};
  background-color: ${p => p.theme.colors.v3};

  ${media.sm`
		padding: ${pxToRem(60)};
	`};
`;

class Login extends React.Component {
  state = {};
  render() {
    return (
      <Flex flex="1" alignItems="center" mt={5}>
        <GlobalStyle isGreenTheme />
        <Container as={Flex} justifyContent="center" width="100%">
          <Wrapper as={Card} flex={`0 1 ${pxToRem(400)}`}>
            <Form />
          </Wrapper>
        </Container>
      </Flex>
    );
  }
}

export default Login;
