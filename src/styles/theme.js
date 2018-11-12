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
};

const buttonSizes = {
  xs: 0,
  default: pxToRem(10),
  lg: pxToRem(16),
};

const buttonBorderRadius = {
  default: 0,
  rounded: '10px',
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
        borderRadius: buttonBorderRadius.rounded,
        active: 'transparent',
        size: buttonSizes,
      },
      danger: {
        backgroundImage: `linear-gradient(to right,#cc4872,${colors.v8})`,
        backgroundColor: 'transparent',
        color: colors.v3,
        border: 'transparent',
        borderRadius: buttonBorderRadius.rounded,
        active: 'transparent',
        size: buttonSizes,
      },
      ghost: {
        backgroundImage: 'none',
        backgroundColor: 'transparent',
        color: colors.v4,
        border: 'transparent',
        borderRadius: buttonBorderRadius.rounded,
        active: 'transparent',
        size: buttonSizes,
      },
      ghostSuccess: {
        backgroundImage: 'none',
        backgroundColor: 'transparent',
        color: colors.v7,
        border: 'transparent',
        borderRadius: buttonBorderRadius.rounded,
        active: 'transparent',
      },
      textSuccess: {
        backgroundImage: 'none',
        backgroundColor: 'transparent',
        color: colors.v7,
        border: 'transparent',
        borderRadius: buttonBorderRadius.default,
        active: 'transparent',
      },
    },
    size: buttonSizes,
  },
};
