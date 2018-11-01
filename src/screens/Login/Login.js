import React from 'react';
import styled from 'styled-components';
import { Flex } from '@rebass/grid';

// components
import { Container } from '../../components';

// screens
import LoginForm from './LoginForm';

const Wrapper = styled.div`
  flex: 1;
`;

class Login extends React.Component {
  state = {};
  render() {
    return (
      <Wrapper>
        <Container as={Flex} justifyContent="center">
          <LoginForm />
        </Container>
      </Wrapper>
    );
  }
}

export default Login;
