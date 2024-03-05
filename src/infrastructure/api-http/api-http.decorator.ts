import { Inject } from '@nestjs/common';
import { getApiHttpToken } from './get-api-http-token';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function ApiHttp(name: string) {
  return Inject(getApiHttpToken(name));
}
