import React, { Component } from 'react';

// styled-components
import { GlobalStyle } from '../../styles';

class Layout extends Component {
  render() {
    const { children } = this.props;

    return (
      <React.Fragment>
        <GlobalStyle />
        {children}
      </React.Fragment>
    );
  }
}

export default Layout;
