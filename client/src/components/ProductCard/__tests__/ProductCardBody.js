import React from 'react';
import { render, cleanup } from 'test-utils';

import ProductCardBody from '../ProductCardBody';

afterEach(cleanup);

describe('<ProductCardBody />', () => {
  test('Renders the ProductCardBody with a title and price', () => {
    const title = 'Foo title';
    const price = 2.5;

    const { container, queryByText, debug } = render(
      <ProductCardBody title={title} price={price} />
    );

    expect(queryByText(title)).toBeInTheDocument();
    expect(container).toHaveTextContent(`$ ${price}`);
  });
});
