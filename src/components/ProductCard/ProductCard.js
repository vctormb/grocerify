import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Flex } from '@rebass/grid';

// styles
import { media } from '../../styles';

const Wrapper = styled(Flex)`
  border-radius: 5px;
  box-shadow: 0 3px 14px 0 rgba(0, 0, 0, 0.1);
  flex: 1;

  ${media.xs`
		flex-direction: ${p => (p.horizontal ? 'row' : 'column')};
	`};
`;

class ProductCard extends React.Component {
  state = {
    horizontal: false,
  };

  componentDidMount() {
    if (this.props.horizontal) {
      this.setState({
        horizontal: true,
      });
    }
  }

  render() {
    const { children, ...rest } = this.props;

    return <Wrapper {...rest}>{children(this.state)}</Wrapper>;
  }
}

ProductCard.defaultProps = {
  mb: 4,
};

ProductCard.propTypes = {
  horizontal: PropTypes.bool,
};

export default ProductCard;
