import { Provider } from '@nestjs/common';
import { ApiHttpOptions } from './api-http-options';
import { getApiHttpToken } from './get-api-http-token';
import { ApiHttpAxiosFactory } from './api-http-client/api-http-axios-factory';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function createApiHttpProviders(options: ApiHttpOptions[]) {
  const providers: Provider[] = options.map((o) => ({
    provide: getApiHttpToken(o.name),
    inject: [ApiHttpAxiosFactory],
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    useFactory: (apiHttpAxiosFactory: ApiHttpAxiosFactory) => {
      const axiosInstance = apiHttpAxiosFactory.create({
        microserviceFullPath: o.microserviceFullPath,
        key: o.key,
        host: o.host,
      });
      return axiosInstance;
    },
  }));
  return providers;
}
