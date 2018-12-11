import React from 'react';
import { render, cleanup, waitForElement, fireEvent, wait } from 'test-utils';

// graphql
import { queries, mutations } from '../../../graphql';
// components
import { Navbar } from '../../../components';

import Home from '../Home';

afterEach(cleanup);

const product1 = {
  id: 1,
  title: 'Bananas',
  imageUrl: null,
  price: 0.12,
  userOrderedProduct: null,
};
const product2 = {
  id: 2,
  title: 'Strawberries',
  imageUrl: null,
  price: 2.97,
  userOrderedProduct: null,
};
const product3 = {
  id: 3,
  title: 'Grapes',
  imageUrl: null,
  price: 1.88,
  userOrderedProduct: null,
};

const productsMock = products => ({
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

const loginUser = {
  name: 'User',
  email: 'user@email.com',
  password: '123123',
};
const loginMock = {
  request: {
    query: mutations.LOGIN,
    variables: {
      email: loginUser.email,
      password: loginUser.password,
    },
  },
  result: {
    data: {
      login: {
        token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxIiwibmFtZSI6IlVzZXIiLCJpYXQiOjE1NDQ0ODIyMDZ9.sQvtvyttI5iP2tyzYC1-YZyMDK2MGhtacs35OeagWI0',
        user: {
          name: loginUser.name,
          order: {
            orderedProducts: [
              {
                product: {
                  id: product1.id,
                },
              },
            ],
          },
        },
      },
    },
  },
};

const countUserOrderedProducts = {
  request: {
    query: queries.COUNT_USER_ORDERED_PRODUCTS,
  },
  result: {
    data: {
      countUserOrderedProducts: 0,
    },
  },
};

const createOrderedProductMock = {
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

describe('<Home />', () => {
  it('should render the list of products', async () => {
    const { getByText, queryAllByText } = render(<Home />, {
      mocks: [productsMock([product1, product2, product3])],
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
      mocks: [productsMock([product1])],
    });

    await waitForElement(() => getByText(product1.title));

    fireEvent.click(getByText(addToCartBtnText));

    expect(getByText(addToCartBtnText)).toBeInTheDocument();
    expect(getByText(/you need to login first!/i)).toBeInTheDocument();
  });

  it.only('should add to cart when user is logged in', async () => {
    const addToCartText = /add to cart/i;
    const modalTitle = /you need to login first!/i;
    const loginButtonId = 'login-btn';

    const {
      getByTestId,
      getByText,
      queryByText,
      getByPlaceholderText,
    } = render(
      <React.Fragment>
        <Navbar />
        <Home />
      </React.Fragment>,
      {
        mocks: [
          productsMock([product1]),
          loginMock,
          countUserOrderedProducts,
          createOrderedProductMock,
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

    expect(getByText(loginUser.name)).toBeInTheDocument();

    fireEvent.click(getByText(addToCartText));
    expect(getByText(addToCartText)).toBeDisabled();

    const removeFromCartBtnText = /remove/i;
    await waitForElement(() => getByText(removeFromCartBtnText));

    expect(getByText(removeFromCartBtnText)).toBeInTheDocument();

    const cartButton = getByTestId('cart-btn');
    await wait(() => expect(cartButton).toHaveTextContent(1));
  });
});
