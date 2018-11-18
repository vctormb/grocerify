import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Flex } from '@rebass/grid';

// styles
import { pxToRem, media } from '../../styles';

const Wrapper = styled(Flex)`
  background-color: ${p => p.theme.colors.v6};
  padding: ${pxToRem(10)};
  flex: 0 1 ${pxToRem(90)};
  border-radius: ${p => (p.rounded ? '5px 0 0 5px' : 0)};

  ${media.xs`
		min-height: ${p => (p.horizontal ? 'initial' : pxToRem(150))};
		border-radius: ${p => (p.rounded ? '5px 5px 0 0' : 0)};
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
		height: ${p => (p.horizontal ? pxToRem(80) : pxToRem(130))};
		width: ${p => (p.horizontal ? pxToRem(80) : pxToRem(130))};
	`};
`;

class ProductCardImage extends React.Component {
  render() {
    const { rounded } = this.props;

    return (
      <Wrapper
        {...this.props}
        rounded={rounded}
        justifyContent="center"
        alignItems="center"
      >
        <ImageContainer {...this.props} />
      </Wrapper>
    );
  }
}

ProductCardImage.defaultProps = {
  rounded: true,
};

ProductCardImage.propTypes = {
  rounded: PropTypes.bool,
};

export default ProductCardImage;