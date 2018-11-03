import styled from 'styled-components';
import { Flex } from '@rebass/grid';

// styles
import { media } from '../../styles';

const ProductCard = styled(Flex)`
  border-radius: 5px;
  box-shadow: 0 3px 14px 0 rgba(0, 0, 0, 0.1);
  flex: 1;

  ${media.xs`
		flex-direction: ${({ flexDirection }) =>
      flexDirection ? flexDirection : 'column'};
	`};
`;

ProductCard.defaultProps = {
  mb: 4,
};

export default ProductCard;
