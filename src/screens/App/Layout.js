import React, { Component } from 'react';

// styled-components
import { GlobalStyle } from '../../styles';

// components
import { Navbar } from '../../components';

class Layout extends Component {
  render() {
    const { children } = this.props;

    return (
      <React.Fragment>
        <GlobalStyle />
        <Navbar />
        {children}
      </React.Fragment>
    );
  }
}

export default Layout;
