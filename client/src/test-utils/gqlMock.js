import { queries, mutations } from '../graphql';

const userData = {
  name: 'User',
  email: 'user@email.com',
  password: '123123',
};

const jwtToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxIiwibmFtZSI6IlVzZXIiLCJpYXQiOjE1NDQ0ODIyMDZ9.sQvtvyttI5iP2tyzYC1-YZyMDK2MGhtacs35OeagWI0';

const loginRequestFn = (orderedProducts = []) => ({
  request: {
    query: mutations.LOGIN,
    variables: {
      email: userData.email,
      password: userData.password,
    },
  },

  result: {
    data: {
      login: {
        token: jwtToken,
        user: {
          name: userData.name,
          order: {
            orderedProducts,
          },
        },
      },
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

export default {
  userData,
  jwtToken,
  loginRequestFn,
  countUserOrderedProductsRequestMockFn,
};
