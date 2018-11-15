import PropTypes from 'prop-types';
import styled from 'styled-components';

// styles
import { pxToRem } from '../../styles';

const Input = styled.input`
  padding: ${({ p }) => p};
  width: 100%;
  border-radius: 3px;
  border: ${p => `1px solid ${p.theme.colors.v5}`};
  color: ${p => p.theme.colors.v4};
  text-transform: uppercase;
  transition: all 0.5s ease;

  &::placeholder {
    opacity: 0.5;
  }

  &:focus {
    outline: 0;
    box-shadow: 0 1px 10px 0 rgba(0, 0, 0, 0.1);
  }
`;

Input.defaultProps = {
  p: pxToRem(10),
};

Input.propTypes = {
  p: PropTypes.string,
};

export default Input;
