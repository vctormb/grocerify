import React from 'react';
import styled from 'styled-components';
import { Flex, Box } from '@rebass/grid';

// graphql
import { Mutation } from 'react-apollo';
import { mutations } from '../../graphql';
// components
import Modal from '../Modal';
import Input from '../Input';
import Button from '../Button';
import withAuth from '../withAuth';

const Form = styled.form`
  flex: 0 1 200px;
`;

const TitleWrapper = styled(Box)`
  text-align: center;
`;

class LoginModal extends React.Component {
  state = {
    email: '',
    password: '',
  };

  setInputValue = (name, value) => {
    this.setState({
      [name]: value,
    });
  };

  onSubmit = (e, login) => {
    const { email, password } = this.state;

    e.preventDefault();

    login({
      variables: {
        email,
        password,
      },
    });
  };

  onCompleted = data => {
    this.props.withAuth.login(data.login.token);

    this.props.showModal(false);
  };

  renderError(error) {
    return error.graphQLErrors.map(({ message }, i) => (
      <TitleWrapper key={i} mb={3}>
        <strong>
          <small>{message}</small>
        </strong>
      </TitleWrapper>
    ));
  }

  render() {
    return (
      <Modal {...this.props}>
        <TitleWrapper mb={5}>
          <h3>You need to login first!</h3>
        </TitleWrapper>
        <Mutation
          mutation={mutations.LOGIN}
          onCompleted={this.onCompleted}
          errorPolicy="all"
        >
          {(login, { error, loading }) => (
            <Form onSubmit={e => this.onSubmit(e, login)}>
              {error && this.renderError(error)}
              <Flex flexDirection="column">
                <Box mb={3}>
                  <Input
                    placeholder="email"
                    p="1rem"
                    onChange={e => this.setInputValue('email', e.target.value)}
                  />
                </Box>
                <Box mb={4}>
                  <Input
                    placeholder="password"
                    type="password"
                    p="1rem"
                    onChange={e =>
                      this.setInputValue('password', e.target.value)
                    }
                  />
                </Box>
                <Button size="lg" appearance="info" disabled={loading}>
                  {loading ? '...' : 'Login'}
                </Button>
              </Flex>
            </Form>
          )}
        </Mutation>
      </Modal>
    );
  }
}

export default withAuth(LoginModal);
