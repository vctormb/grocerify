import React from 'react';
import { Box } from '@rebass/grid';

const CardBody = props => <Box {...props} />;

CardBody.defaultProps = {
  p: 10,
};

export default CardBody;
