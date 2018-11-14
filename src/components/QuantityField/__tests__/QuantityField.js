import React from 'react';
import { render, cleanup, fireEvent } from 'test-utils';

import QuantityField from '../QuantityField';

afterEach(cleanup);

describe('<QuantityField />', () => {
  const incrementBtnId = 'quantity-increment';
  const decrementBtnId = 'quantity-decrement';
  const qntInputId = 'quantity-input';

  it('Renders QuantityField properly', () => {
    const { getByTestId } = render(<QuantityField />);

    const incrementBtn = getByTestId(incrementBtnId);
    const decrementBtn = getByTestId(decrementBtnId);
    const qntInput = getByTestId(qntInputId);

    expect(incrementBtn).toBeInTheDocument();
    expect(decrementBtn).toBeInTheDocument();
    expect(qntInput).toBeInTheDocument();
    expect(qntInput.value).toBe('1');
    expect(qntInput).toHaveAttribute('readonly');
  });

  it('Increments QuantityField value', () => {
    const { getByTestId } = render(<QuantityField />);

    const incrementBtn = getByTestId(incrementBtnId);
    const qntInput = getByTestId(qntInputId);

    fireEvent.click(incrementBtn);
    expect(qntInput.value).toBe('2');

    fireEvent.click(incrementBtn);
    expect(qntInput.value).toBe('3');
  });

  it('Should not decrement when value is equal to 1', () => {
    const { getByTestId } = render(<QuantityField />);

    const decrementBtn = getByTestId(decrementBtnId);
    const qntInput = getByTestId(qntInputId);

    fireEvent.click(decrementBtn);
    expect(qntInput.value).toBe('1');
  });

  it('Decrements QuantityField value', () => {
    const { getByTestId } = render(<QuantityField count={4} />);

    const decrementBtn = getByTestId(decrementBtnId);
    const qntInput = getByTestId(qntInputId);

    fireEvent.click(decrementBtn);
    expect(qntInput.value).toBe('3');

    fireEvent.click(decrementBtn);
    expect(qntInput.value).toBe('2');
  });
});
