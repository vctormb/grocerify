import React from 'react';
import styled from 'styled-components';
import { Flex, Box } from '@rebass/grid';

// styles
import { pxToRem, media } from '../../styles';

// components
import { Input, Button, Card } from '../../components';

const Wrapper = styled(Box)`
  padding: ${pxToRem(30)};
  background-color: ${p => p.theme.colors.v3};

  ${media.sm`
		padding: ${pxToRem(60)};
	`};
`;

const Form = styled.form`
  flex: 0 1 200px;
`;

const TitleWrapper = styled(Box)`
  text-align: center;
`;

class LoginForm extends React.Component {
  state = {};

  render() {
    return (
      <Wrapper as={Card} flex={`0 1 ${pxToRem(400)}`}>
        <TitleWrapper mb={5}>
          <h3>Welcome Back!</h3>
        </TitleWrapper>
        <Form onSubmit={e => e.preventDefault()}>
          <Flex flexDirection="column">
            <Box mb={3}>
              <Input placeholder="email" p="1rem" />
            </Box>
            <Box mb={4}>
              <Input placeholder="password" type="password" p="1rem" />
            </Box>
            <Button size="lg">Login</Button>
          </Flex>
        </Form>
      </Wrapper>
    );
  }
}

export default LoginForm;