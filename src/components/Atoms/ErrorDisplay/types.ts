export interface ErrorDisplayProps {
  message: string;
  details?: string;
  onRetry?: () => void;
  actionText?: string;
  onAction?: () => void;
  variant?: 'default' | 'compact' | 'inline';
  testId?: string;
}
