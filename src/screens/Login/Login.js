import React from 'react';
import styled from 'styled-components';
import { Flex } from '@rebass/grid';

// components
import { Container } from '../../components';

// screens
import LoginForm from './LoginForm';

// styles
import { GlobalStyle, media } from '../../styles';

const Wrapper = styled.div`
  display: flex;
  flex: 1;
  align-items: center;

  ${media.lg`
		display: block;
		align-items: initial;
	`};
`;

class Login extends React.Component {
  state = {};
  render() {
    return (
      <Wrapper>
        <GlobalStyle isLogin />
        <Container as={Flex} justifyContent="center" width="100%">
          <LoginForm />
        </Container>
      </Wrapper>
    );
  }
}

export default Login;
