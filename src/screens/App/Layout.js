import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

// styled-components
import { GlobalStyle } from '../../styles';

// components
import { Navbar } from '../../components';

class Layout extends Component {
  render() {
    const {
      children,
      location: { pathname },
    } = this.props;

    return (
      <React.Fragment>
        <GlobalStyle />
        <Navbar isLoginScreen={pathname === '/login'} />
        {children}
      </React.Fragment>
    );
  }
}

export default withRouter(Layout);
