import pxToRem from './pxToRem';

/**
 * `v` means variant
 */
const colors = {
  v1: '#333',
  v3: '#fff',
  v4: '#8e8e8e',
  v5: '#ccc',
  v6: '#f1f1f1',
  v7: '#1dbc57',
  v8: '#cb4c58',
  v9: '#bc1d86',
};

const buttonSizes = {
  default: pxToRem(10),
  lg: pxToRem(16),
};

export default {
  fontFamily: `'Open sans', sans-serif`,
  fontSize: '1rem',

  /**
   * breakpoints followed from bootstrap
   */
  breakpoints: [
    '36em', // 576px
    '48em', // 768px
    '62em', // 992px
    '75em', // 1200px
  ],

  colors,

  button: {
    appearance: {
      primary: {
        backgroundImage: 'none',
        backgroundColor: colors.v3,
        color: colors.v4,
        border: colors.v5,
        active: 'transparent',
        size: buttonSizes,
      },
      danger: {
        backgroundImage: 'linear-gradient(to right,#cc4872,#dc5151)',
        backgroundColor: 'transparent',
        color: colors.v3,
        border: 'transparent',
        active: 'transparent',
        size: buttonSizes,
      },
      ghost: {
        backgroundImage: 'none',
        backgroundColor: 'transparent',
        color: colors.v4,
        border: 'transparent',
        active: 'transparent',
        size: buttonSizes,
      },
      ghostSuccess: {
        backgroundImage: 'none',
        backgroundColor: 'transparent',
        color: colors.v7,
        border: 'transparent',
        active: 'transparent',
      },
    },
    size: buttonSizes,
  },
};
