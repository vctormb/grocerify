import React from 'react';
import PropTypes from 'prop-types';
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

  componentDidMount() {
    if (this.props.count) {
      this.setState({
        count: this.props.count,
      });
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.count !== this.props.count) {
      this.setState({
        count: this.props.count,
      });
    }
  }

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
    const { disabled } = this.props;
    return (
      <Flex>
        <Button
          size="xs"
          appearance="textSuccess"
          onClick={this.minusValue}
          data-testid="quantity-decrement"
          disabled={disabled}
        >
          -
        </Button>
        <StyledInput
          p={`0 ${pxToRem(5)}`}
          value={this.state.count}
          readOnly={true}
          data-testid="quantity-input"
        />
        <Button
          size="xs"
          appearance="textSuccess"
          onClick={this.plusValue}
          data-testid="quantity-increment"
          disabled={disabled}
        >
          +
        </Button>
      </Flex>
    );
  }
}

QuantityField.propTypes = {
  count: PropTypes.number,
  disabled: PropTypes.bool,
};

export default QuantityField;
