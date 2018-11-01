import React from 'react';
import styled from 'styled-components';

// styles
import { pxToRem } from '../../styles';

const Card = styled.div`
  padding: ${pxToRem(10)};
  border-radius: 3px;
  box-shadow: 0 4px 18px 0 rgba(0, 0, 0, 0.2);
  background-color: ${p => p.theme.colors.v2};
  color: ${p => p.theme.colors.v3};
  flex: 0 1 ${pxToRem(350)};
`;

class LoginForm extends React.Component {
  state = {};

  render() {
    return (
      <Card>
        <form
          onSubmit={e => console.log('submit')}
          style={{ flex: '0 1 200px' }}
        >
          <input placeholder="email" />
          <input placeholder="password" type="password" />
        </form>
      </Card>
    );
  }
}

export default LoginForm;
