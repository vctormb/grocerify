import React from 'react';
import ReactDOM from 'react-dom';
import App from './screens/App';
import * as serviceWorker from './serviceWorker';

// graphql
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

// styled-components
import { ThemeProvider } from 'styled-components';
import { theme } from './styles';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </ApolloProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
