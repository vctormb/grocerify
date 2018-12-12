import React from 'react';
import {
  render,
  cleanup,
  fireEvent,
  wait,
  waitForElement,
  gqlMock,
} from 'test-utils';

// graphql
import { queries } from '../../../graphql';

import Cart from '../Cart';
import { Navbar } from '../../../components';

const orderedProduct1 = {
  id: '1',
  quantity: 1,
  product: {
    id: '1',
    title: 'Bananas',
    imageUrl: null,
    price: 1,
  },
};
const orderedProduct2 = {
  id: '2',
  quantity: 1,
  product: {
    id: '2',
    title: 'Oranges',
    imageUrl: null,
    price: 2,
  },
};
const orderedProduct3 = {
  id: '3',
  quantity: 1,
  product: {
    id: '3',
    title: 'Apples',
    imageUrl: null,
    price: 3,
  },
};

const userOrderRequestMockFn = (orderedProducts = [], totalPrice = 0) => ({
  request: {
    query: queries.USER_ORDER,
  },
  result: {
    data: {
      userOrder: {
        order: {
          id: 1,
          orderedProducts,
        },
        totalPrice,
      },
    },
  },
});

afterEach(cleanup);

describe('<Cart />', () => {
  it('should show the list of products added in the cart', async () => {
    const { getByText } = render(<Cart />, {
      mocks: [
        userOrderRequestMockFn(
          [orderedProduct1, orderedProduct2, orderedProduct3],
          6
        ),
      ],
    });

    await wait(() => [
      expect(getByText(orderedProduct1.product.title)).toBeInTheDocument(),
      expect(getByText(orderedProduct2.product.title)).toBeInTheDocument(),
      expect(getByText(orderedProduct3.product.title)).toBeInTheDocument(),
      expect(getByText(/6.00/i)).toBeInTheDocument(),
    ]);
  });
});
