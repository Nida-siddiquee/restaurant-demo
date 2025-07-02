import React from 'react';
import { BackButtonProps } from './types';
import { StyledBackLink } from './BackButton.styled.ts';

const BackButton: React.FC<BackButtonProps> = ({ to, children, id }) => {
  return (
    <StyledBackLink id={id} to={to}>
      {children}
    </StyledBackLink>
  );
};

export default BackButton;
