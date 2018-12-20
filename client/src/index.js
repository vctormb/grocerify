// required until Cypress support fetch API
import 'whatwg-fetch';

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './screens/App';
import * as serviceWorker from './serviceWorker';

// graphql
import { ApolloProvider } from 'react-apollo';
import { client } from './graphql';
// styled-components
import { ThemeProvider } from 'styled-components';
import { theme } from './styles';
// components
import { AppProvider } from './components';

ReactDOM.render(
  <ApolloProvider client={client}>
    <ThemeProvider theme={theme}>
      <AppProvider>
        <Router>
          <App />
        </Router>
      </AppProvider>
    </ThemeProvider>
  </ApolloProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
