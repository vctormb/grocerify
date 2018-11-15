import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// styles
import { media } from '../../styles';
// components
import Card from '../Card';

const Wrapper = styled(Card)`
  display: flex;
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
