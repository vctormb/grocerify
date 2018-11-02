import React from 'react';
import styled from 'styled-components';
import { Flex } from '@rebass/grid';

// components
import { Container } from '../../components';

// screens
import LoginForm from './LoginForm';

// styles
import { GlobalStyle, media } from '../../styles';

const Wrapper = styled(Flex)`
  ${media.lg`
		display: block;
		align-items: initial;
	`};
`;

class Login extends React.Component {
  state = {};
  render() {
    return (
      <Wrapper flex="1" alignItems="center" mt={[0, 0, 0, 0, 5]}>
        <GlobalStyle isLogin />
        <Container as={Flex} justifyContent="center" width="100%">
          <LoginForm />
        </Container>
      </Wrapper>
    );
  }
}

export default Login;
