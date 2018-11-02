import React from 'react';
import styled from 'styled-components';
import { Flex, Box } from '@rebass/grid';

// styles
import { pxToRem, media } from '../../styles';

// components
import { Input, Button } from '../../components';

const Card = styled.div`
  flex: 0 1 ${pxToRem(400)};
  padding: ${pxToRem(30)};
  border-radius: 5px;
  background-color: ${p => p.theme.colors.v3};
  box-shadow: 0 4px 18px 0 rgba(0, 0, 0, 0.2);

  ${media.sm`
		padding: 60px;
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
      <Card>
        <TitleWrapper mb={5}>
          <h3>Login</h3>
        </TitleWrapper>
        <Form onSubmit={e => e.preventDefault()}>
          <Flex flexDirection="column">
            <Box mb={3}>
              <Input placeholder="EMAIL" p="1rem" />
            </Box>
            <Box mb={4}>
              <Input placeholder="PASSWORD" type="password" p="1rem" />
            </Box>
            <Button p="1rem">Login</Button>
          </Flex>
        </Form>
      </Card>
    );
  }
}

export default LoginForm;
