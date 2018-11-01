import { css } from 'styled-components';
import theme from './theme';

const labels = ['xs', 'sm', 'md', 'lg'];

export default labels.reduce((acc, label, i) => {
  acc[label] = (...args) => {
    return css`
      @media (min-width: ${theme.breakpoints[i]}) {
        ${css(...args)};
      }
    `;
  };

  return acc;
}, {});
