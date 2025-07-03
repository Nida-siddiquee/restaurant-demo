import React, { Component, ErrorInfo, ReactNode } from 'react';
import { CustomError, createGenericError } from '@/utils/errors';
import ErrorDisplay from '@/components/Atoms/ErrorDisplay';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallbackComponent?: React.ComponentType<{ error: CustomError; onRetry: () => void }>;
  onError?: (error: CustomError, errorInfo: ErrorInfo) => void;
  resetOnPropsChange?: boolean;
  resetKeys?: Array<string | number>;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: CustomError | null;
  resetTimeoutId?: number;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  private resetTimeoutId: number | null = null;

  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    const customError =
      error instanceof CustomError
        ? error
        : createGenericError(error.message || 'An unexpected error occurred');

    return { hasError: true, error: customError };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    const customError = this.state.error || createGenericError(error.message);

    console.error('ErrorBoundary caught an error:', error, errorInfo);

    this.props.onError?.(customError, errorInfo);

    // In test environments, assume development mode
    const isDevelopment = typeof window !== 'undefined' || typeof global !== 'undefined';
    if (!isDevelopment) {
      // Some error reporting service can be used here, e.g.,
    }
  }

  componentDidUpdate(prevProps: ErrorBoundaryProps) {
    const { resetOnPropsChange, resetKeys } = this.props;
    const { hasError } = this.state;

    if (hasError && resetKeys && prevProps.resetKeys) {
      const hasResetKeyChanged = resetKeys.some(
        (key, index) => key !== prevProps.resetKeys![index],
      );

      if (hasResetKeyChanged) {
        this.resetErrorBoundary();
      }
    }

    if (hasError && resetOnPropsChange && prevProps.children !== this.props.children) {
      this.resetErrorBoundary();
    }
  }

  componentWillUnmount() {
    if (this.resetTimeoutId) {
      clearTimeout(this.resetTimeoutId);
    }
  }

  resetErrorBoundary = () => {
    if (this.resetTimeoutId) {
      clearTimeout(this.resetTimeoutId);
    }

    this.setState({ hasError: false, error: null });
  };

  handleRetry = () => {
    this.resetErrorBoundary();
  };

  handleReload = () => {
    window.location.reload();
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError && this.state.error) {
      if (this.props.fallbackComponent) {
        const FallbackComponent = this.props.fallbackComponent;
        return <FallbackComponent error={this.state.error} onRetry={this.handleRetry} />;
      }

      return (
        <ErrorDisplay
          error={this.state.error}
          onRetry={this.handleRetry}
          onReload={this.handleReload}
          onGoHome={this.handleGoHome}
          showDetails={true}
        />
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
