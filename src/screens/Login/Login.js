import React from 'react';
import { Flex } from '@rebass/grid';

// components
import { Container } from '../../components';

// screens
import LoginForm from './LoginForm';

// styles
import { GlobalStyle } from '../../styles';

class Login extends React.Component {
  state = {};
  render() {
    return (
      <Flex flex="1" alignItems="center" mt={5}>
        <GlobalStyle isLoginScreen />
        <Container as={Flex} justifyContent="center" width="100%">
          <LoginForm />
        </Container>
      </Flex>
    );
  }
}

export default Login;
