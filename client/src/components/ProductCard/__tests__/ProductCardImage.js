import React from 'react';
import { render, cleanup, wait } from 'test-utils';

import ProductCardImage from '../ProductCardImage';

afterEach(cleanup);

describe('<ProductCardImage />', () => {
  test('Renders the ProductCardImage without an image', () => {
    const { getByTestId } = render(<ProductCardImage />);

    expect(getByTestId('image-container')).toHaveStyleRule('opacity', '0');
  });

  test('Renders the ProductCardImage with an image', async () => {
    const imageUrl =
      'https://www.alternativesyouth.org/wp-content/uploads/2016/11/person-icon.png';

    // todo
  });
});
