import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Flex } from '@rebass/grid';

// components
import Icon from '../Icon';

// styles
import { pxToRem, media, colors } from '../../styles';

const Wrapper = styled(Flex)`
  position: relative;
  padding: ${pxToRem(10)};
  flex: 0 1 ${pxToRem(90)};
  border-radius: ${p => (p.rounded ? '5px 0 0 5px' : 0)};

  ${media.xs`
		min-height: ${p => (p.horizontal ? 'initial' : pxToRem(150))};
		border-radius: ${p => (p.rounded ? '5px 5px 0 0' : 0)};
	`};
`;

const ImageContainer = styled.div`
  opacity: ${p => p.imageOpacity};
  height: ${pxToRem(80)};
  width: ${pxToRem(80)};
  background-color: ${p => p.theme.colors.v3};
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  z-index: 5;
  background-image: ${p => `url(${p.imageUrl})`};

  transition-property: opacity;
  transition-duration: 1s;
  transition-timing-function: ease;

  ${media.xs`
		height: ${p => (p.horizontal ? pxToRem(80) : pxToRem(130))};
		width: ${p => (p.horizontal ? pxToRem(80) : pxToRem(130))};
	`};
`;

const NoImageContainer = styled(Flex)`
  position: absolute;
  margin: 0 auto;
`;

class ProductCardImage extends React.Component {
  constructor(props) {
    super(props);

    this.imageContainer = null;
  }

  state = {
    imageOpacity: 0,
    imageUrl: 'none',
  };

  componentDidMount() {
    if (this.props.imageUrl) {
      this.loadImage();
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.imageUrl !== this.props.imageUrl) {
      this.setImage();
    }
  }

  loadImage() {
    const imageInstance = new Image();

    imageInstance.src = this.props.imageUrl;

    imageInstance.onload = () => {
      if (this.imageContainer) {
        this.setImage();
      }
    };
  }

  setImage() {
    this.setState({
      imageOpacity: 1,
      imageUrl: this.props.imageUrl,
    });
  }

  render() {
    const { rounded } = this.props;

    return (
      <Wrapper
        {...this.props}
        rounded={rounded}
        justifyContent="center"
        alignItems="center"
      >
        <ImageContainer
          {...this.props}
          imageOpacity={this.state.imageOpacity}
          imageUrl={this.state.imageUrl}
          data-testid="image-container"
          ref={el => (this.imageContainer = el)}
        />

        <NoImageContainer justifyContent="center">
          <Icon height="20" width="20" icon="camera" fill={colors.v4} />
        </NoImageContainer>
      </Wrapper>
    );
  }
}

ProductCardImage.defaultProps = {
  rounded: true,
};

ProductCardImage.propTypes = {
  rounded: PropTypes.bool,
  imageUrl: PropTypes.string,
};

export default ProductCardImage;
