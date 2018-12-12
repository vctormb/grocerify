import ApolloClient from 'apollo-boost';

// utils
import { auth } from '../utils';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  request: operation => {
    const token = auth.getToken();
    if (token) {
      operation.setContext({
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    }
  },
});

export default client;
