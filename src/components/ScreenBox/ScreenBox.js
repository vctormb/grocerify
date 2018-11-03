import React from 'react';
import { Box } from '@rebass/grid';

const ScreenBox = ({ children, ...rest }) => (
  <Box {...rest} mt={[6, 6, 6, 6, 6]}>
    {children}
  </Box>
);

export default ScreenBox;
