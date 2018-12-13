import React from 'react';
import { Route, Switch } from 'react-router-dom';

// components
import { PrivateRoute } from '../../components';
// styled-components
import { GlobalStyle } from '../../styles';

// screens
import Layout from './Layout';
import Login from '../Login';
import Home from '../Home';
import Cart from '../Cart';
import Success from '../Success';

class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <GlobalStyle />
        <Layout>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <PrivateRoute exact path="/cart" component={Cart} />
            <PrivateRoute exact path="/success" component={Success} />
            <Route component={() => 'Oops! 404!'} />
          </Switch>
        </Layout>
      </React.Fragment>
    );
  }
}

export default App;
