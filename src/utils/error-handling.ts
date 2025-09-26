"use client";

export class AppError extends Error {
  constructor(
    message: string,
    public code: string,
    public details?: any
  ) {
    super(message);
    this.name = 'AppError';
  }
}

export const handleError = (error: unknown, context?: string): AppError => {
  console.error(`Error in ${context}:`, error);
  
  if (error instanceof AppError) {
    return error;
  }
  
  if (error instanceof Error) {
    return new AppError(error.message, 'GENERAL_ERROR', { originalError: error });
  }
  
  if (typeof error === 'string') {
    return new AppError(error, 'STRING_ERROR');
  }
  
  return new AppError('An unknown error occurred', 'UNKNOWN_ERROR', { error });
};

export const showErrorNotification = (error: AppError) => {
  // This would integrate with your toast system
  console.error('Error notification:', error.message, error.code);
};

export const retryOperation = async <T>(
  operation: () => Promise<T>,
  maxRetries: number = 3,
  delay: number = 1000
): Promise<T> => {
  let lastError: Error;
  
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error as Error;
      console.warn(`Attempt ${attempt + 1} failed:`, error);
      
      if (attempt < maxRetries - 1) {
        await new Promise(resolve => setTimeout(resolve, delay * (attempt + 1)));
      }
    }
  }
  
  throw lastError!;
};