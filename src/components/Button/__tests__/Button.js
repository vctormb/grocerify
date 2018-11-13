import React from 'react';
import { render, cleanup, getByTestId, getByText } from 'test-utils';

import Button from '../Button';

afterEach(cleanup);

describe('<Button />', () => {
  test('Renders button with children', () => {
    const btnText = 'Foo btn';

    const { getByText } = render(<Button>{btnText}</Button>);

    expect(getByText(btnText)).toBeInTheDocument();
  });

  test('Renders button with icon and children', () => {
    const btnText = 'Foo btn';

    const { container } = render(
      <Button icon="shopping-cart">{btnText}</Button>
    );

    expect(getByText(container, btnText)).toBeInTheDocument();
    expect(getByTestId(container, 'svg-icon')).toBeInTheDocument();
  });
});
