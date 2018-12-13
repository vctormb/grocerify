import React from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';

// svgs
import icons from '../../svgs/icomoon/icons.svg';

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const Rotate = styled.span`
  animation: ${spin} 0.3s linear infinite;
`;

const Icon = ({ icon, ...rest }) => (
  <svg {...rest} data-testid="svg-icon">
    <use xlinkHref={`${icons}#icon-${icon}`} />
  </svg>
);

const SpinIcon = styled(Icon)`
  display: block;
  margin: 0 auto;
`;

const Component = ({ spin, ...rest }) => {
  if (spin) {
    return (
      <Rotate>
        <SpinIcon {...rest} />
      </Rotate>
    );
  }

  return <Icon {...rest} />;
};

Icon.propTypes = {
  icon: PropTypes.string.isRequired,
  spin: PropTypes.bool,
};

export default Component;
