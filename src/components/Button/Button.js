import PropTypes from 'prop-types';
import styled from 'styled-components';

const Button = styled.button`
  padding: 10px;
  background-image: ${p => p.theme.button[p.color].backgroundImg};
  border: ${p => `1px solid ${p.theme.colors.v5}`};
  box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.2);
  border-radius: 3px;
  cursor: pointer;
  color: ${p => p.theme.button[p.color].color};
  font-weight: 600;

  &:disabled {
    background-image: none;
    background-color: ${p => p.theme.colors.v6};
    box-shadow: none;
    color: ${p => p.theme.colors.v5};
  }
`;

Button.defaultProps = {
  color: 'primary',
};

Button.propTypes = {
  color: PropTypes.oneOf(['primary']),
};

export default Button;
