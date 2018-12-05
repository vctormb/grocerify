import React from 'react';
import styled from 'styled-components';
import { Box, Flex } from '@rebass/grid';
import { Transition } from 'react-transition-group';

// components
import { ScreenBox, Container, Icon, Card } from '../../components';
// styles
import { pxToRem, GlobalStyle } from '../../styles';

const duration = 500;
const applyTransition = state => {
  switch (state) {
    case 'entering':
      return `
        transform: translateY(10px);
        opacity: 0 ;
      `;

    case 'entered':
      return `
      transform: translateY(0px);
        opacity: 1;
      `;

    default:
      return null;
  }
};

const StyledCard = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${p => p.theme.colors.v3};

  ${({ transitionState }) => applyTransition(transitionState)};
  transition: ${`all ${duration}ms ease-in-out`};
`;

const StyledIcon = styled(Icon)`
  fill: ${p => p.theme.colors.v7};
`;

const P = styled.p`
  text-align: center;
  font-weight: 300;
  color: ${p => p.theme.colors.v8};
`;

const IconWrapper = styled(Flex)`
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
            <Transition in={true} appear={true} timeout={duration}>
              {transitionState => (
                <StyledCard
                  as={Card}
                  p={4}
                  flex={`0 1 ${pxToRem(400)}`}
                  transitionState={transitionState}
                >
                  <IconWrapper mb={2}>
                    <StyledIcon icon="check_2" width="100" height="100" />
                  </IconWrapper>
                  <h2>All done!</h2>
                  <P>We received your order and it's going to arrive soon!</P>
                </StyledCard>
              )}
            </Transition>
          </Flex>
        </Container>
      </ScreenBox>
    );
  }
}

export default Success;
