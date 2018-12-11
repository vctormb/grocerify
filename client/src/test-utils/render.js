import React from 'react';
import { render as rtlRender } from 'react-testing-library';
// styled-components
import { ThemeProvider } from 'styled-components';
import { theme } from '../styles';
// react-router
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
// graphql
import { MockedProvider } from 'react-apollo/test-utils';
// components
import { AppProvider } from '../components';

function render(
  ui,
  {
    route = '/',
    history = createMemoryHistory({ initialEntries: [route] }),
    mocks = [],
    ...renderOptions
  } = {}
) {
  const rendered = rtlRender(
    <MockedProvider mocks={mocks} addTypename={false}>
      <ThemeProvider theme={theme}>
        <AppProvider>
          <Router history={history}>{ui}</Router>
        </AppProvider>
      </ThemeProvider>
    </MockedProvider>,
    renderOptions
  );

  return {
    ...rendered,
    rerender: (ui, options) => {
      return render(ui, { container: rendered.container, ...options });
    },
    history,
  };
}

export default render;
