import React from 'react';
import { render, cleanup } from 'test-utils';

import ProductCard from '../ProductCard';

afterEach(cleanup);

describe('<ProductCard />', () => {
  test('Renders the ProductCard with render props', () => {
    const { queryByText } = render(
      <ProductCard>{() => <div>foo</div>}</ProductCard>
    );

    expect(queryByText('foo')).toBeInTheDocument();
  });
});
