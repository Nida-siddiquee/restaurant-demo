import React from 'react';
import { Icon, Message, Title, Wrapper } from './ClearFiltersEmptyState.styled';
import SecondaryButton from '../SecondaryButton';
import FilterIcon from '@/assets/filterIcon.svg';

interface Props {
  onClear: () => void;
}

const ClearFiltersEmptyState: React.FC<Props> = ({ onClear }) => (
  <Wrapper>
    <Icon src={FilterIcon} alt="Filter icon" />
    <Title>Clear your filters</Title>
    <Message>
      You may have filtered out your new favourite place! Fewer filters will give you more options.
    </Message>
    <SecondaryButton onClick={onClear}>Clear filter</SecondaryButton>
  </Wrapper>
);

export default ClearFiltersEmptyState;
