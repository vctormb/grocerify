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
  const rendered = rtlRender(
    <ThemeProvider theme={theme}>
      <Router history={history}>{ui}</Router>
    </ThemeProvider>,
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
