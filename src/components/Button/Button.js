import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// styles
import { pxToRem } from '../../styles';

// components
import Icon from '../Icon';
import buttonStyle from './buttonStyle';

const Wrapper = styled.button`
  ${buttonStyle};

  &:focus {
    outline: 0;
  }
`;

const CustomIcon = styled(Icon)`
  margin-right: 8px;
`;

const Button = ({ children, icon, ...rest }) => {
  let leftIcon;

  if (icon) {
    leftIcon = (
      <CustomIcon width="16" height="16" icon={icon} fill="currentColor" />
    );
  }

  return (
    <Wrapper {...rest}>
      {leftIcon}
      {children}
    </Wrapper>
  );
};

Button.defaultProps = {
  appearance: 'primary',
  p: pxToRem(10),
};

Button.propTypes = {
  appearance: PropTypes.oneOf(['primary', 'ghost', 'ghostSuccess']),
  p: PropTypes.string,
  icon: PropTypes.string,
};

export default Button;
