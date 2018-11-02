import React from 'react';
import styled from 'styled-components';
import { Box } from '@rebass/grid';

// styles
import { pxToRem } from '../../styles';

// components
import { Input, Button } from '../../components';

const Card = styled.div`
  flex: 0 1 ${pxToRem(350)};
  padding: ${pxToRem(35)};
  border-radius: 5px;
  background-color: ${p => p.theme.colors.v2};
  box-shadow: 0 4px 18px 0 rgba(0, 0, 0, 0.2);
`;

const Form = styled.form`
  display: flex;
  flex: 0 1 200px;
  flex-direction: column;
`;

class LoginForm extends React.Component {
  state = {};

  render() {
    return (
      <Card>
        <Form onSubmit={e => console.log('submit')}>
          <Box mb={3}>
            <Input placeholder="email" />
          </Box>
          <Box mb={3}>
            <Input placeholder="password" type="password" />
          </Box>
          <Button>Login</Button>
        </Form>
      </Card>
    );
  }
}

export default LoginForm;
