import React, { Component } from 'react';
import { withRouter, Prompt } from 'react-router-dom';
import { compose } from 'recompose';

// styled-components
import { GlobalStyle } from '../../styles';

// components
import { Navbar, withApp } from '../../components';

class Layout extends Component {
  render() {
    const {
      children,
      location: { pathname },
    } = this.props;

    return (
      <React.Fragment>
        <GlobalStyle />
        <Prompt
          when={this.props.withApp.isBlocking}
          message={location => `Are you sure you want to leave this page?`}
        />
        <Navbar
          isGreenTheme={pathname === '/login' || pathname === '/success'}
        />
        {children}
      </React.Fragment>
    );
  }
}

const enhance = compose(
  withRouter,
  withApp
);

export default enhance(Layout);
