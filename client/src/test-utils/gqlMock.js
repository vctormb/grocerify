import React from 'react';
import { mutations } from '../graphql';
import { withApp } from '../components';

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

export default {
  userData,
  jwtToken,
  loginRequestFn,
};
