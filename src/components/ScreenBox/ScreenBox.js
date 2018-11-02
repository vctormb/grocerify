import React from 'react';
import { Box } from '@rebass/grid';

const ScreenBox = ({ children, ...rest }) => (
  <Box {...rest} mt={[3, 3, 3, 3, 4]}>
    {children}
  </Box>
);

export default ScreenBox;
