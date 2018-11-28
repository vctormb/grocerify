import React from 'react';
import styled from 'styled-components';
import { Flex, Box } from '@rebass/grid';

// components
import Modal from '../Modal';
import Input from '../Input';
import Button from '../Button';

const Form = styled.form`
  flex: 0 1 200px;
`;

const TitleWrapper = styled(Box)`
  text-align: center;
`;

class LoginModal extends React.Component {
  render() {
    return (
      <Modal {...this.props}>
        <TitleWrapper mb={5}>
          <h3>You need to login first!</h3>
        </TitleWrapper>

        <Form onSubmit={e => e.preventDefault()}>
          <Flex flexDirection="column">
            <Box mb={3}>
              <Input placeholder="email" p="1rem" />
            </Box>
            <Box mb={4}>
              <Input placeholder="password" type="password" p="1rem" />
            </Box>
            <Button size="lg" appearance="info">
              Login
            </Button>
          </Flex>
        </Form>
      </Modal>
    );
  }
}

export default LoginModal;
