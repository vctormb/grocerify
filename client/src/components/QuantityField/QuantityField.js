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

function useMounted(callback, inputs) {
  const mounted = React.useRef(false);

  React.useEffect(() => {
    if (mounted.current) {
      callback();
    }

    mounted.current = true;
  }, inputs);
}

function QuantityField(props) {
  const [count, setCount] = React.useState(1);

  React.useEffect(() => {
    if (props.count) {
      setCount(props.count);
    }
  }, []);

  useMounted(
    () => {
      setCount(props.count);
    },
    [props.count]
  );

  function incrementValue() {
    const value = count + 1;

    setCount(value);
    handleChange(value);
  }

  function decrementValue() {
    if (count === 1) return;

    const value = count - 1;

    setCount(value);
    handleChange(value);
  }

  function handleChange(value) {
    const { onChange } = props;

    if (onChange) onChange(value);
  }

  return (
    <Flex>
      <Button
        size="xs"
        appearance="textSuccess"
        onClick={decrementValue}
        data-testid="quantity-decrement"
        disabled={props.disabled}
      >
        -
      </Button>
      <StyledInput
        p={`0 ${pxToRem(5)}`}
        value={count}
        readOnly={true}
        data-testid="quantity-input"
      />
      <Button
        size="xs"
        appearance="textSuccess"
        onClick={incrementValue}
        data-testid="quantity-increment"
        disabled={props.disabled}
      >
        +
      </Button>
    </Flex>
  );
}

QuantityField.propTypes = {
  count: PropTypes.number,
  disabled: PropTypes.bool,
};

export default QuantityField;
