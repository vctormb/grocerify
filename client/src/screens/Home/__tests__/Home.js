import React from 'react';
import {
  render,
  cleanup,
  waitForElement,
  fireEvent,
  wait,
  gqlMock,
} from 'test-utils';

// graphql
import { queries, mutations } from '../../../graphql';
// components
import { Navbar, withApp } from '../../../components';

import Home from '../Home';

afterEach(cleanup);

const product1 = {
  id: 1,
  title: 'Bananas',
  imageUrl: null,
  price: 1,
  userOrderedProduct: null,
};
const product2 = {
  id: 2,
  title: 'Strawberries',
  imageUrl: null,
  price: 2,
  userOrderedProduct: null,
};
const product3 = {
  id: 3,
  title: 'Grapes',
  imageUrl: null,
  price: 3,
  userOrderedProduct: null,
};

const productsRequestMockFn = products => ({
  request: {
    query: queries.PRODUCTS,
    variables: {
      first: 12,
      skip: 0,
    },
  },
  result: {
    data: {
      products,
    },
  },
});

const countUserOrderedProductsRequestMockFn = count => ({
  request: {
    query: queries.COUNT_USER_ORDERED_PRODUCTS,
  },
  result: {
    data: {
      countUserOrderedProducts: count,
    },
  },
});

const createOrderedProductRequestMock = {
  request: {
    query: mutations.CREATE_ORDERED_PRODUCT,
    variables: {
      productId: product1.id,
      quantity: 1,
    },
  },
  result: {
    data: {
      createOrderedProduct: {
        id: 1,
      },
    },
  },
};

const deleteOrderedProductRequestMock = {
  request: {
    query: mutations.DELETE_ORDERED_PRODUCT,
    variables: {
      productId: product1.id,
    },
  },
  result: {
    data: {
      deleteOrderedProduct: {
        orderedProduct: {
          id: 1,
        },
        totalPrice: 0,
      },
    },
  },
};

const LoginButtonMock = withApp(({ withApp }) => (
  <button onClick={() => withApp.login(gqlMock.jwtToken)}>login mock</button>
));

describe('<Home />', () => {
  it('should render the list of products', async () => {
    const { getByText, queryAllByText } = render(<Home />, {
      mocks: [productsRequestMockFn([product1, product2, product3])],
    });

    await waitForElement(() => [
      getByText(product1.title),
      getByText(product2.title),
      getByText(product3.title),
    ]);

    expect(queryAllByText(/add to cart/i)).toHaveLength(3);
  });

  it('should show the login modal when trying to add to cart without being logged in', async () => {
    const addToCartBtnText = /add to cart/i;

    const { getByText } = render(<Home />, {
      mocks: [productsRequestMockFn([product1])],
    });

    await waitForElement(() => getByText(product1.title));

    fireEvent.click(getByText(addToCartBtnText));

    expect(getByText(addToCartBtnText)).toBeInTheDocument();
    expect(getByText(/you need to login first!/i)).toBeInTheDocument();
  });

  it('should add to cart when user is logged in', async () => {
    const addToCartText = /add to cart/i;
    const modalTitle = /you need to login first!/i;
    const loginButtonId = 'login-btn';

    const {
      getByTestId,
      getByText,
      queryByText,
      getByPlaceholderText,
      debug,
    } = render(
      <React.Fragment>
        <Navbar />
        <Home />
      </React.Fragment>,
      {
        mocks: [
          productsRequestMockFn([product1]),
          gqlMock.loginRequestFn(),
          countUserOrderedProductsRequestMockFn(0),
          createOrderedProductRequestMock,
        ],
      }
    );

    await waitForElement(() => getByText(product1.title));

    fireEvent.click(getByText(addToCartText));

    expect(getByText(modalTitle)).toBeInTheDocument();

    const emailInput = getByPlaceholderText(/email/i);
    const passwordInput = getByPlaceholderText(/password/i);

    fireEvent.change(emailInput, {
      target: { value: 'user@email.com' },
    });

    fireEvent.change(passwordInput, {
      target: { value: '123123' },
    });

    fireEvent.click(getByTestId(loginButtonId));
    expect(getByTestId(loginButtonId)).toBeDisabled();

    await wait(() => expect(queryByText(modalTitle)).not.toBeInTheDocument());

    expect(getByText(gqlMock.userData.name)).toBeInTheDocument();

    fireEvent.click(getByText(addToCartText));
    expect(getByText(addToCartText)).toBeDisabled();

    const removeFromCartBtnText = /remove/i;
    await waitForElement(() => getByText(removeFromCartBtnText));

    expect(getByText(removeFromCartBtnText)).toBeInTheDocument();

    const cartButton = getByTestId('cart-btn');
    await wait(() => expect(cartButton).toHaveTextContent(1));
  });

  it('should remove from cart when user is logged in', async () => {
    const removeFromCartBtnText = /remove/i;

    const { getByTestId, getByText, debug } = render(
      <React.Fragment>
        <Navbar />
        <Home />
        <LoginButtonMock />
      </React.Fragment>,
      {
        mocks: [
          productsRequestMockFn([
            { ...product1, userOrderedProduct: { id: 1 } },
          ]),
          gqlMock.loginRequestFn(),
          countUserOrderedProductsRequestMockFn(1),
          deleteOrderedProductRequestMock,
        ],
      }
    );

    fireEvent.click(getByText(/login mock/i));

    const cartButton = getByTestId('cart-btn');
    await wait(() => expect(cartButton).toHaveTextContent(1));

    await waitForElement(() => getByText(product1.title));

    fireEvent.click(getByText(removeFromCartBtnText));
    expect(getByText(removeFromCartBtnText)).toBeDisabled();

    const addToCartBtnText = /add to cart/i;
    await waitForElement(() => getByText(addToCartBtnText));

    expect(getByText(addToCartBtnText)).toBeInTheDocument();

    await wait(() => expect(cartButton).not.toHaveTextContent());
  });
});
