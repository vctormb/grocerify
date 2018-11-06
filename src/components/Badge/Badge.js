import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.span`
  position: relative;
`;

const BadgeNumber = styled.div`
  position: absolute;
  top: -8px;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: translateX(34%);
  color: ${p => p.theme.colors.v3};
  border-radius: 10px;
  background-color: ${p => p.theme.colors.v8};
  min-width: 20px;
  min-height: 20px;
  font-size: 10px;
  font-weight: 600;
  padding: 1px 6px;
`;

const Badge = ({ children, count }) => {
  const treatedCount = count > 99 ? `99+` : count;

  return (
    <Wrapper>
      {!!count && <BadgeNumber>{treatedCount}</BadgeNumber>}
      {children}
    </Wrapper>
  );
};

Badge.defaultProps = {
  count: 0,
};

Badge.propTypes = {
  count: PropTypes.number,
};

export default Badge;
