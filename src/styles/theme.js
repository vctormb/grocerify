/**
 * `v` means variant
 */
const colors = {
  v1: '#333',
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
    primary: {
      background: colors.v3,
      color: colors.v1,
    },
    success: {
      background: colors.v2,
      color: colors.v3,
    },
  },
};
