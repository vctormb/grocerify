import PropTypes from 'prop-types';
import styled from 'styled-components';

// styles
import { pxToRem } from '../../styles';

const Button = styled.button`
  padding: ${({ p }) => p};
  background-color: ${p => p.theme.button[p.color].backgroundColor};
  border: ${p => `1px solid ${p.theme.colors.v5}`};
  border-radius: 10px;
  cursor: pointer;
  color: ${p => p.theme.button[p.color].color};
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

Button.defaultProps = {
  color: 'primary',
  p: pxToRem(10),
};

Button.propTypes = {
  color: PropTypes.oneOf(['primary']),
  p: PropTypes.string,
};

export default Button;
