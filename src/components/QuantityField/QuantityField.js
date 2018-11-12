import React from 'react';
import { Flex } from '@rebass/grid';
import styled from 'styled-components';

import { pxToRem } from '../../styles';
// components
import Button from '../Button';
import Input from '../Input';

const StyledInput = styled(Input)`
  text-align: center;
  width: 50px;
  margin: 0 2px;
`;

class QuantityField extends React.Component {
  state = {
    count: 1,
  };

  plusValue = () => {
    this.setState({ count: this.state.count + 1 }, () => {
      this.handleChange();
    });
  };

  minusValue = () => {
    if (this.state.count === 1) return;

    this.setState({ count: this.state.count - 1 }, () => {
      this.handleChange();
    });
  };

  handleChange() {
    const { onChange } = this.props;

    if (onChange) onChange(this.state.count);
  }

  render() {
    return (
      <Flex>
        <Button
          as="a"
          role="button"
          size="xs"
          appearance="textSuccess"
          onClick={this.plusValue}
        >
          +
        </Button>
        <StyledInput p={`0 ${pxToRem(5)}`} value={this.state.count} readOnly />
        <Button
          as="a"
          role="button"
          size="xs"
          appearance="textSuccess"
          onClick={this.minusValue}
        >
          -
        </Button>
      </Flex>
    );
  }
}

export default QuantityField;
