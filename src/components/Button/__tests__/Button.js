import React from 'react';
import { render, cleanup } from 'test-utils';

import Button from '../Button';

afterEach(cleanup);

test('Renders button with children', () => {
  const { getByText } = render(<Button>Foo btn</Button>);

  expect(getByText(/foo btn/i)).toBeInTheDocument();
});
