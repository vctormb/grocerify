import React from 'react';
import { render as rtlRender } from 'react-testing-library';
// styled-components
import { ThemeProvider } from 'styled-components';
import { theme } from '../styles';
// react-router
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

function render(
  ui,
  {
    route = '/',
    history = createMemoryHistory({ initialEntries: [route] }),
    ...renderOptions
  } = {}
) {
  return {
    ...rtlRender(
      <ThemeProvider theme={theme}>
        <Router history={history}>{ui}</Router>
      </ThemeProvider>,
      renderOptions
    ),
    history,
  };
}

export default render;
