import styled from 'styled-components';
import { Box } from '@rebass/grid';

// styles
import { pxToRem } from '../../styles';

const CardBody = styled(Box)`
  padding: ${pxToRem(10)};
`;

export default CardBody;
