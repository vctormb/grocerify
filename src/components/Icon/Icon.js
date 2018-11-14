import React from 'react';
import PropTypes from 'prop-types';
import icons from '../../svgs/icomoon/icons.svg';

const Icon = ({ icon, ...rest }) => (
  <svg {...rest} data-testid="svg-icon">
    <use xlinkHref={`${icons}#icon-${icon}`} />
  </svg>
);

Icon.propTypes = {
  icon: PropTypes.string.isRequired,
};

export default Icon;
