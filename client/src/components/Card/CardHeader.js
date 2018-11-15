import React from 'react';
import styled from 'styled-components';
import { Box } from '@rebass/grid';

// styles
import { pxToRem } from '../../styles';

const CardHeader = styled(Box)`
  border-bottom: ${p => `1px solid ${p.theme.colors.v6}`};
  padding: ${pxToRem(10)};
`;

const H2 = styled.h2`
  margin: 0;
`;

const Component = ({ children, ...rest }) => (
  <CardHeader {...rest}>
    <H2>{children}</H2>
  </CardHeader>
);

export default Component;
