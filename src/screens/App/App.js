import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

// screens
import Layout from './Layout';
import Login from '../Login';
import Home from '../Home';

class App extends React.Component {
  render() {
    return (
      <Router>
        <Layout>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
        </Layout>
      </Router>
    );
  }
}

export default App;
