import styled from 'styled-components';
import { Link } from 'react-router-dom';

// styles
import { pxToRem } from '../../styles';

// components
import { buttonStyle } from '../Button';

const LinkButton = styled(Link)`
	${buttonStyle}
  font-size: ${pxToRem(13.3)};
`;

export default LinkButton;
