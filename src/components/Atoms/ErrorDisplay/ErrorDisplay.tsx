import React from 'react';
import { ErrorType, CustomError } from '@/utils/errors';
import PrimaryButton from '@/components/Atoms/PrimaryButton';
import SecondaryButton from '@/components/Atoms/SecondaryButton';
import { Actions, Container, ErrorDetails, ErrorIcon, Message, Title } from './ErrorDisplay.styled';

interface ErrorDisplayProps {
  error: CustomError;
  onRetry?: () => void;
  onGoHome?: () => void;
  onReload?: () => void;
  showDetails?: boolean;
}

const getErrorContent = (errorType: ErrorType) => {
  switch (errorType) {
    case ErrorType.NETWORK_ERROR:
      return {
        icon: '🌐',
        title: 'Connection Problem',
        message:
          'Unable to connect to our servers. Please check your internet connection and try again.',
      };
    case ErrorType.API_ERROR:
      return {
        icon: '⚠️',
        title: 'Service Unavailable',
        message: "Our service is temporarily unavailable. We're working to fix this issue.",
      };
    case ErrorType.NOT_FOUND_ERROR:
      return {
        icon: '🔍',
        title: 'Not Found',
        message: "The page or resource you're looking for doesn't exist or has been moved.",
      };
    case ErrorType.TIMEOUT_ERROR:
      return {
        icon: '⏱️',
        title: 'Request Timeout',
        message: 'The request is taking longer than expected. Please try again.',
      };
    case ErrorType.VALIDATION_ERROR:
      return {
        icon: '❌',
        title: 'Invalid Input',
        message: 'Please check your input and try again.',
      };
    default:
      return {
        icon: '😕',
        title: 'Something Went Wrong',
        message:
          'An unexpected error occurred. Please try again or contact support if the problem persists.',
      };
  }
};

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({
  error,
  onRetry,
  onGoHome,
  onReload,
  showDetails = false,
}) => {
  const { icon, title, message } = getErrorContent(error.type);

  return (
    <Container role="alert" aria-live="polite">
      <ErrorIcon>{icon}</ErrorIcon>
      <Title>{title}</Title>
      <Message>{message}</Message>

      <Actions>
        {error.retryable && onRetry && (
          <PrimaryButton onClick={onRetry} aria-label="Retry the last action">
            Try Again
          </PrimaryButton>
        )}

        {onReload && (
          <SecondaryButton onClick={onReload} aria-label="Reload the page">
            Reload Page
          </SecondaryButton>
        )}

        {onGoHome && (
          <SecondaryButton onClick={onGoHome} aria-label="Go to home page">
            Go Home
          </SecondaryButton>
        )}
      </Actions>

      {showDetails && (
        <ErrorDetails>
          <summary>Technical Details</summary>
          <div>
            <strong>Error Type:</strong> {error.type}
            <br />
            {error.statusCode && (
              <>
                <strong>Status Code:</strong> {error.statusCode}
                <br />
              </>
            )}
            <strong>Time:</strong> {new Date(error.timestamp).toLocaleString()}
            <br />
            <strong>Message:</strong>
            <pre>{error.message}</pre>
            {error.context && Object.keys(error.context).length > 0 && (
              <>
                <strong>Context:</strong>
                <pre>{JSON.stringify(error.context, null, 2)}</pre>
              </>
            )}
          </div>
        </ErrorDetails>
      )}
    </Container>
  );
};

export default ErrorDisplay;
