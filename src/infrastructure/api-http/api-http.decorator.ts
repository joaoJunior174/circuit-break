import { Inject } from '@nestjs/common';
import { getApiHttpToken } from './get-api-http-token';

export function ApiHttp(name: string): PropertyDecorator & ParameterDecorator {
  return Inject(getApiHttpToken(name));
}
