import React from 'react';
import ReactDOM from 'react-dom';
import App from './screens/App';
import * as serviceWorker from './serviceWorker';

// graphql
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
// utils
import { auth } from './utils';
// styled-components
import { ThemeProvider } from 'styled-components';
import { theme } from './styles';
// components
import { AppProvider } from './components';

export const client = new ApolloClient({
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

ReactDOM.render(
  <ApolloProvider client={client}>
    <ThemeProvider theme={theme}>
      <AppProvider>
        <App />
      </AppProvider>
    </ThemeProvider>
  </ApolloProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
