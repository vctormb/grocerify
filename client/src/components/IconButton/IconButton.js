import React from 'react';
import Button from '../Button';
import Icon from '../Icon';

const IconButton = ({ children, icon, ...rest }) => (
  <Button {...rest}>
    <Icon width="16" height="16" icon={icon} fill="currentColor" />
    {children}
  </Button>
);

export default IconButton;
