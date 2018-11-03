import React from 'react';
import styled from 'styled-components';
import { Flex } from '@rebass/grid';

// styles
import { pxToRem, media } from '../../styles';

const Wrapper = styled(Flex)`
  background-color: ${p => p.theme.colors.v6};
  padding: ${pxToRem(10)};
  flex: 0 1 ${pxToRem(90)};
  border-radius: 5px 5px 0 0;

  ${media.xs`
		min-height: ${pxToRem(150)};
	`};
`;

const ImageContainer = styled.div`
  height: ${pxToRem(80)};
  width: ${pxToRem(80)};
  background-color: ${p => p.theme.colors.v3};
  background-image: url(https://static1.squarespace.com/static/57c99e749de4bb3184279ffc/t/5a9d6ce2ec212d5494fc7947/1520265396167/?format=300w);
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  ${media.xs`
		height: ${pxToRem(130)};
		width: ${pxToRem(130)};
	`};
`;

class ProductCardImage extends React.Component {
  state = {};
  render() {
    return (
      <Wrapper justifyContent="center" alignItems="center">
        <ImageContainer>
          <ImageContainer />
        </ImageContainer>
      </Wrapper>
    );
  }
}

export default ProductCardImage;
