import React from 'react';
import { render, cleanup, fireEvent, wait, gqlMock } from 'test-utils';

// graphql
import { queries } from '../../../graphql';

import App from '../../../screens/App';

const productsRequestMockFn = (products = []) => ({
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

afterEach(cleanup);

describe('<Navbar />', () => {
  it('should redirect the to the cart screen when user logs in and click in the cart button', async () => {
    const modalTitle = /you need to login first!/i;
    const loginButtonId = 'login-btn';

    const {
      getByTestId,
      queryByTestId,
      getByText,
      queryByText,
      getByPlaceholderText,
      debug,
    } = render(<App />, {
      mocks: [gqlMock.loginRequestFn(), productsRequestMockFn()],
    });

    const cartButton = getByTestId('cart-btn');

    fireEvent.click(cartButton);

    expect(getByText(modalTitle)).toBeInTheDocument();

    const emailInput = getByPlaceholderText(/email/i);
    const passwordInput = getByPlaceholderText(/password/i);

    fireEvent.change(emailInput, {
      target: { value: gqlMock.userData.email },
    });

    fireEvent.change(passwordInput, {
      target: { value: gqlMock.userData.password },
    });

    fireEvent.click(getByTestId(loginButtonId));
    expect(getByTestId(loginButtonId)).toBeDisabled();

    await wait(() => expect(queryByText(modalTitle)).not.toBeInTheDocument());

    expect(getByText(gqlMock.userData.name)).toBeInTheDocument();

    fireEvent.click(cartButton);

    expect(queryByTestId('home-screen')).not.toBeInTheDocument();
    expect(getByTestId('cart-screen')).toBeInTheDocument();
  });
});
