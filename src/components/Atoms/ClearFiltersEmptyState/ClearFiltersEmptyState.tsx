import React from 'react';
import { Icon, Message, Title, Wrapper } from './ClearFiltersEmptyState.styled';
import SecondaryButton from '../SecondaryButton';
import FilterIcon from '@/assets/filterIcon.svg';
import { ClearFiltersEmptyStateProps } from './types';

const ClearFiltersEmptyState: React.FC<ClearFiltersEmptyStateProps> = ({ onClear }) => (
  <Wrapper
    role="status"
    aria-live="polite"
    aria-labelledby="clear-filters-title"
    aria-describedby="clear-filters-message"
  >
    <Icon src={FilterIcon} alt="" role="presentation" data-testid="clear-filters-icon" />
    <Title id="clear-filters-title" data-testid="clear-filters-title">
      Clear your filters
    </Title>
    <Message id="clear-filters-message" data-testid="clear-filters-message">
      You may have filtered out your new favourite place! Fewer filters will give you more options.
    </Message>
    <SecondaryButton
      data-testid="clear-filters-button"
      onClick={onClear}
      aria-describedby="clear-filters-message"
    >
      Clear filter
    </SecondaryButton>
  </Wrapper>
);

export default ClearFiltersEmptyState;
