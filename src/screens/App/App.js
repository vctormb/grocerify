import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

// screens
import Layout from './Layout';

class App extends Component {
  render() {
    return (
      <Router>
        <Layout>
          <Route exact path="/" component={() => 'slash'} />
          <Route exact path="/login" component={() => 'login'} />
        </Layout>
      </Router>
    );
  }
}

export default App;
