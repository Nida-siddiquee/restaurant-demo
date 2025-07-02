// Error types for better error categorization and handling
export enum ErrorType {
  NETWORK_ERROR = 'NETWORK_ERROR',
  API_ERROR = 'API_ERROR',
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  NOT_FOUND_ERROR = 'NOT_FOUND_ERROR',
  TIMEOUT_ERROR = 'TIMEOUT_ERROR',
  GENERIC_ERROR = 'GENERIC_ERROR',
}

export interface AppError {
  type: ErrorType;
  message: string;
  statusCode?: number;
  retryable?: boolean;
  timestamp?: number;
  context?: Record<string, unknown>;
}

export class CustomError extends Error implements AppError {
  public type: ErrorType;
  public statusCode?: number;
  public retryable?: boolean;
  public timestamp: number;
  public context?: Record<string, unknown>;

  constructor(
    type: ErrorType,
    message: string,
    statusCode?: number,
    retryable = false,
    context?: Record<string, unknown>
  ) {
    super(message);
    this.name = 'CustomError';
    this.type = type;
    this.statusCode = statusCode;
    this.retryable = retryable;
    this.timestamp = Date.now();
    this.context = context;
  }
}

export const createNetworkError = (message = 'Network connection failed'): CustomError =>
  new CustomError(ErrorType.NETWORK_ERROR, message, undefined, true);

export const createApiError = (statusCode: number, message: string): CustomError =>
  new CustomError(ErrorType.API_ERROR, message, statusCode, statusCode >= 500);

export const createValidationError = (message: string): CustomError =>
  new CustomError(ErrorType.VALIDATION_ERROR, message, 400, false);

export const createNotFoundError = (resource = 'Resource'): CustomError =>
  new CustomError(ErrorType.NOT_FOUND_ERROR, `${resource} not found`, 404, false);

export const createTimeoutError = (message = 'Request timed out'): CustomError =>
  new CustomError(ErrorType.TIMEOUT_ERROR, message, 408, true);

export const createGenericError = (message: string): CustomError =>
  new CustomError(ErrorType.GENERIC_ERROR, message, 500, false);

export const parseError = (error: unknown): CustomError => {
  if (error instanceof CustomError) {
    return error;
  }

  if (error instanceof Error) {
    if (error.message.includes('fetch') || error.message.includes('NetworkError')) {
      return createNetworkError(error.message);
    }

    if (error.message.includes('timeout') || error.message.includes('aborted')) {
      return createTimeoutError(error.message);
    }

    const apiErrorMatch = error.message.match(/API error: (\d+)/);
    if (apiErrorMatch) {
      const statusCode = parseInt(apiErrorMatch[1], 10);
      return createApiError(statusCode, error.message);
    }

    if (error.message.includes('required') || error.message.includes('invalid')) {
      return createValidationError(error.message);
    }

    if (error.message.includes('not found')) {
      return createNotFoundError();
    }

    return createGenericError(error.message);
  }

  return createGenericError('An unexpected error occurred');
};
