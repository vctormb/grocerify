import styled from 'styled-components';
import { Box } from '@rebass/grid';

const Container = styled(Box)`
  max-width: 992px;
`;

Container.defaultProps = {
  mx: 'auto',
  px: 3,
};

export default Container;
