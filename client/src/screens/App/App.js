import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// components
import { PrivateRoute } from '../../components';

// screens
import Layout from './Layout';
import Login from '../Login';
import Home from '../Home';
import Cart from '../Cart';

class App extends React.Component {
  render() {
    return (
      <Router>
        <Layout>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/cart" component={Cart} />
            <PrivateRoute exact path="/success" component={() => 'SUCCESS'} />
            <Route component={() => 'Oops! 404!'} />
          </Switch>
        </Layout>
      </Router>
    );
  }
}

export default App;
