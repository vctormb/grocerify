/**
 * `v` means variant
 */
const colors = {
  v1: '#333',
  v2: '#2eaa6d',
  v3: '#fff',
  v4: '#8e8e8e',
  v5: '#ccc',
  v6: '#f1f1f1',
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
      backgroundImg: `linear-gradient(${colors.v3}, ${colors.v6})`,
      color: colors.v4,
    },
  },
};
