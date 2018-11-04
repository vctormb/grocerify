import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// styles
import { pxToRem } from '../../styles';

// components
import Icon from '../Icon';

const Wrapper = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${({ p }) => p};
  background-color: ${p => p.theme.button[p.appearance].backgroundColor};
  border: ${p => `1px solid ${p.theme.button[p.appearance].border}`};
  border-radius: 10px;
  text-decoration: none;
  cursor: pointer;
  color: ${p =>
    p.color ? p.theme.colors[p.color] : p.theme.button[p.appearance].color};
  font-weight: 600;
  transition: all 0.1s ease;

  &:disabled {
    background-image: none;
    background-color: ${p => p.theme.colors.v6};
    box-shadow: none;
    color: ${p => p.theme.colors.v5};
  }

  &:focus {
    outline: 0;
    box-shadow: 0 1px 10px 0 rgba(0, 0, 0, 0.1);
  }

  &:active {
    transform: translateY(2px);
    background-color: transparent;
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
