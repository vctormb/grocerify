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
import { queries, mutations } from '../../../graphql';
// components
import { Navbar, withApp } from '../../../components';

import Cart from '../Cart';
import App from '../../App';

const orderedProduct1 = {
  id: '1',
  quantity: 2, // different quantity!
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

const updateOrderedProductRequestMockFn = (quantity = 1, totalPrice = 0) => ({
  request: {
    query: mutations.UPDATE_ORDERED_PRODUCT,
    variables: {
      orderedProductId: orderedProduct1.id,
      quantity,
    },
  },
  result: {
    data: {
      updateOrderedProduct: {
        orderedProduct: {
          id: orderedProduct1.id,
          quantity,
        },
        totalPrice,
      },
    },
  },
});

const deleteOrderedProductRequestMock = {
  request: {
    query: mutations.DELETE_ORDERED_PRODUCT,
    variables: {
      productId: orderedProduct1.product.id,
    },
  },
  result: {
    data: {
      deleteOrderedProduct: {
        orderedProduct: {
          id: orderedProduct1.id,
        },
        totalPrice: 0,
      },
    },
  },
};

const resetOrderRequestMock = {
  request: {
    query: mutations.RESET_ORDER,
  },
  result: {
    data: {
      resetOrder: {
        count: 0,
      },
    },
  },
};

const LoginButtonMock = withApp(({ withApp }) => (
  <button onClick={() => withApp.login(gqlMock.jwtToken)}>login mock</button>
));

afterEach(cleanup);

describe('<Cart />', () => {
  it('should show the empty cart message if there`s no products in the cart', async () => {
    const { getByText } = render(<Cart />, {
      mocks: [userOrderRequestMockFn([])],
    });

    await wait(() => [
      expect(getByText(/your cart is empty!/i)).toBeInTheDocument(),
    ]);
  });

  it('should show the list of products added in the cart', async () => {
    const { getByText } = render(<Cart />, {
      mocks: [
        userOrderRequestMockFn(
          [orderedProduct1, orderedProduct2, orderedProduct3],
          7
        ),
      ],
    });

    await wait(() => [
      expect(getByText(orderedProduct1.product.title)).toBeInTheDocument(),
      expect(getByText(orderedProduct2.product.title)).toBeInTheDocument(),
      expect(getByText(orderedProduct3.product.title)).toBeInTheDocument(),
      expect(getByText(/7.00/i)).toBeInTheDocument(),
    ]);
  });

  it('should increment the order price when a product is incremented', async () => {
    const quantityInputId = 'quantity-input';

    const { getByTestId, getByText, debug } = render(<Cart />, {
      mocks: [
        userOrderRequestMockFn([orderedProduct1], 2),
        updateOrderedProductRequestMockFn(3, 3),
      ],
    });

    await waitForElement(() => getByText(orderedProduct1.product.title));

    expect(getByTestId(quantityInputId)).toHaveAttribute('value', '2');
    expect(getByText('$ 2.00')).toBeInTheDocument();

    fireEvent.click(getByTestId('quantity-increment'));

    await wait(() => expect(getByText('$ 3.00')).toBeInTheDocument());
    expect(getByTestId(quantityInputId)).toHaveAttribute('value', '3');
  });

  it('should decrement the order price when a product is decremented', async () => {
    const quantityInputId = 'quantity-input';

    const { getByTestId, getByText, debug } = render(<Cart />, {
      mocks: [
        userOrderRequestMockFn([orderedProduct1], 2),
        updateOrderedProductRequestMockFn(1, 1),
      ],
    });

    await waitForElement(() => getByText(orderedProduct1.product.title));

    expect(getByTestId(quantityInputId)).toHaveAttribute('value', '2');
    expect(getByText('$ 2.00')).toBeInTheDocument();

    fireEvent.click(getByTestId('quantity-decrement'));

    await wait(() => expect(getByText('$ 1.00')).toBeInTheDocument());
    expect(getByTestId(quantityInputId)).toHaveAttribute('value', '1');
  });

  it('should remove the product from cart when clicked on remove btn', async () => {
    const { getByTestId, getByText, queryByText, container, debug } = render(
      <React.Fragment>
        <Navbar />
        <Cart />
        <LoginButtonMock />
      </React.Fragment>,
      {
        mocks: [
          gqlMock.countUserOrderedProductsRequestMockFn(1),
          userOrderRequestMockFn([orderedProduct1], 2),
          deleteOrderedProductRequestMock,
        ],
      }
    );

    fireEvent.click(getByText(/login mock/i));

    await waitForElement(() => [
      getByText(orderedProduct1.product.title),
      getByText(/user/i),
    ]);

    const cartButton = getByTestId('cart-btn');
    await wait(() => expect(cartButton).toHaveTextContent(1));

    fireEvent.click(getByText(/remove/i));

    await wait(() =>
      expect(queryByText(/your cart is empty!/i)).toBeInTheDocument()
    );

    const cartBtnBadge = container
      .querySelector('[data-testid="cart-btn"]')
      .querySelector('[data-testid="badge"]');

    expect(cartButton).not.toContainElement(cartBtnBadge);
  });

  it('should navigate to the success screen when clicked on checkout btn', async () => {
    const { getByTestId, getByText, container, debug } = render(
      <React.Fragment>
        <App />
        <LoginButtonMock />
      </React.Fragment>,
      {
        route: '/login',
        mocks: [
          gqlMock.countUserOrderedProductsRequestMockFn(1),
          userOrderRequestMockFn([orderedProduct1], 2),
          resetOrderRequestMock,
        ],
      }
    );
    const cartButton = getByTestId('cart-btn');

    fireEvent.click(getByText(/login mock/i));
    await waitForElement(() => getByText(gqlMock.userData.name));
    await wait(() => expect(cartButton).toHaveTextContent(1));

    fireEvent.click(cartButton);

    await waitForElement(() => getByText(orderedProduct1.product.title));

    fireEvent.click(getByText(/checkout/i));

    expect(getByText(/all done!/i)).toBeInTheDocument();

    const cartBtnBadge = container
      .querySelector('[data-testid="cart-btn"]')
      .querySelector('[data-testid="badge"]');

    await wait(() => expect(cartButton).not.toContainElement(cartBtnBadge));
  });
});
