import { Logger } from '@nestjs/common';
import { FallBackErrorType } from './fallback-error.type';

export const fallbackReturn = (
  message: FallBackErrorType,
): FallBackErrorType => {
  const logger = new Logger();
  logger.error(`${message.error}`);
  return {
    data: [],
    error: message.error,
  };
};
