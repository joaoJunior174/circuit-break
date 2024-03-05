import { DynamicModule, Module } from '@nestjs/common';
import { ApiHttpOptions } from './api-http-options';
import { ApiHttpClientModule } from './api-http-client';
import { createApiHttpProviders } from './api-http.providers';

@Module({
  imports: [ApiHttpClientModule],
})
export class ApiHttpModule {
  static forFeature(options: ApiHttpOptions[]): DynamicModule {
    const providers = createApiHttpProviders(options);
    return {
      module: ApiHttpModule,
      providers,
      exports: providers,
    };
  }
}
