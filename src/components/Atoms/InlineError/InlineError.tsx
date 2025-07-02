import React from 'react';
import { CustomError } from '@/utils/errors';
import { InlineContainer, Icon, Message, RetryButton } from './InlineError.styled';

interface InlineErrorProps {
  error: CustomError;
  onRetry?: () => void;
  className?: string;
}

const InlineError: React.FC<InlineErrorProps> = ({ error, onRetry, className }) => {
  return (
    <InlineContainer className={className} role="alert" aria-live="polite">
      <Icon>⚠️</Icon>
      <Message>{error.message}</Message>
      {error.retryable && onRetry && (
        <RetryButton onClick={onRetry} aria-label="Retry the failed action">
          Retry
        </RetryButton>
      )}
    </InlineContainer>
  );
};

export default InlineError;
