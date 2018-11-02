import styled from 'styled-components';

// styles
import { pxToRem } from '../../styles';

const Input = styled.input`
  padding: ${pxToRem(10)};
  width: 100%;
  border-radius: 3px;
  border: ${p => `1px solid ${p.theme.colors.v5}`};
  color: ${p => p.theme.colors.v4};
  transition: all 0.5s ease;

  ::placeholder {
    opacity: 0.5;
  }

  :focus {
    outline: 0;
    box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.2);
  }
`;

export default Input;
