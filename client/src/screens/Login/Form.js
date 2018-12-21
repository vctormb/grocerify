import React from 'react';
import styled from 'styled-components';
import { Flex, Box } from '@rebass/grid';
import { withRouter } from 'react-router-dom';

// graphql
import { Mutation } from 'react-apollo';
import { mutations } from '../../graphql';
// components
import { Input, Button, withApp } from '../../components';
// styles
import { pxToRem } from '../../styles';

const Form = styled.form`
  flex: 0 1 200px;
`;

const TitleWrapper = styled(Box)`
  text-align: center;
`;

const CreateAccountBtn = styled.button`
  font-size: ${pxToRem(12)};
  cursor: pointer;
  margin-top: ${pxToRem(16)};
  border: none;
  background-color: transparent;
  font-weight: 600;
  outline: none;
`;

const loginForm = {
  type: 'login',
  title: 'Welcome Back!',
  submitText: 'Login',
  footerButtonText: `Don't have an account?`,
};

const signupForm = {
  type: 'signup',
  title: 'Create an account!',
  submitText: 'Sign up',
  footerButtonText: `Already have an account?`,
};

const formInputs = {
  name: '',
  email: '',
  password: '',
};

class LoginForm extends React.Component {
  state = {
    form: loginForm,
    inputs: formInputs,
  };

  handleLoginOrSignup = () => {
    if (this.state.form.type === 'login') {
      this.setForm(signupForm);
    } else {
      this.setForm(loginForm);
    }
  };

  setForm = form => {
    this.setState({
      form,
      inputs: formInputs,
    });
  };

  setInputValue = (name, value) => {
    this.setState({
      inputs: {
        ...this.state.inputs,
        [name]: value,
      },
    });
  };

  onSubmit = (e, submit) => {
    const { name, email, password } = this.state.inputs;

    e.preventDefault();

    submit({
      variables: {
        name,
        email,
        password,
      },
    });
  };

  onCompleted = data => {
    this.props.withApp.login(data[this.state.form.type].token);

    this.props.history.push('/');
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
    const { form } = this.state;

    return (
      <React.Fragment>
        <TitleWrapper mb={5}>
          <h3>{this.state.form.title}</h3>
        </TitleWrapper>
        <Mutation
          mutation={
            form.type === loginForm.type ? mutations.LOGIN : mutations.SIGN_UP
          }
          onCompleted={this.onCompleted}
        >
          {(submit, { error, loading }) => (
            <Form onSubmit={e => this.onSubmit(e, submit)}>
              {error && this.renderError(error)}
              <Flex flexDirection="column">
                {this.state.form.type === signupForm.type && (
                  <Box mb={3}>
                    <Input
                      name="name"
                      placeholder="name"
                      p="1rem"
                      onChange={e => this.setInputValue('name', e.target.value)}
                      value={this.state.inputs.name}
                    />
                  </Box>
                )}
                <Box mb={3}>
                  <Input
                    name="email"
                    placeholder="email"
                    p="1rem"
                    onChange={e => this.setInputValue('email', e.target.value)}
                    value={this.state.inputs.email}
                  />
                </Box>
                <Box mb={4}>
                  <Input
                    name="password"
                    placeholder="password"
                    type="password"
                    p="1rem"
                    onChange={e =>
                      this.setInputValue('password', e.target.value)
                    }
                    value={this.state.inputs.password}
                  />
                </Box>
                <Button size="lg" disabled={loading} data-testid="login-btn">
                  {loading ? 'loading...' : this.state.form.submitText}
                </Button>
                <Flex>
                  <CreateAccountBtn
                    type="button"
                    onClick={this.handleLoginOrSignup}
                    disabled={loading}
                  >
                    {this.state.form.footerButtonText}
                  </CreateAccountBtn>
                </Flex>
              </Flex>
            </Form>
          )}
        </Mutation>
      </React.Fragment>
    );
  }
}

export default withRouter(withApp(LoginForm));
