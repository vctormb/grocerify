import React from 'react';
import styled from 'styled-components';
import { Box, Flex } from '@rebass/grid';

// components
import { ScreenBox, Container, Icon, Card } from '../../components';
// styles
import { pxToRem, GlobalStyle, media } from '../../styles';

const StyledCard = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${p => p.theme.colors.v3};
`;

const StyledIcon = styled(Icon)`
  fill: ${p => p.theme.colors.v7};
`;

const P = styled.p`
  text-align: center;
  font-weight: 300;
  color: ${p => p.theme.colors.v8};
`;

const IconWrapper = styled(Box)`
  box-shadow: 0 3px 14px 0 rgba(0, 0, 0, 0.1);
  border-radius: 50%;
`;

class Success extends React.Component {
  render() {
    return (
      <ScreenBox>
        <GlobalStyle isGreenTheme />
        <Container>
          <Flex justifyContent="center">
            <StyledCard as={Card} p={4} flex={`0 1 ${pxToRem(400)}`}>
              <IconWrapper mb={2}>
                <StyledIcon icon="circlecheck-new" width="100" height="100" />
              </IconWrapper>
              <h2>All done!</h2>
              <P>We received your order and it's going to arrive soon!</P>
            </StyledCard>
          </Flex>
        </Container>
      </ScreenBox>
    );
  }
}

export default Success;
