import React from 'react';
import { Box } from '@rebass/grid';

const Col = props => <Box {...props} px={3} />;

Col.defaultProps = {
  flex: '1 1 auto',
};

export default Col;
