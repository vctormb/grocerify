import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Box } from '@rebass/grid';

const Card = styled(Box)`
  box-shadow: 0 3px 14px 0 rgba(0, 0, 0, 0.1);
  border-radius: ${p => (p.rounded ? '5px' : 0)};
`;

Card.defaultProps = {
  rounded: true,
};

Card.propTypes = {
  rounded: PropTypes.bool,
};

export default Card;
