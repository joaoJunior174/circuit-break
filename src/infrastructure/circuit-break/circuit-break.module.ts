import { DynamicModule, Module } from '@nestjs/common';
import {
  CircuitBreakProviderType,
  createCircuitBreakProviders,
} from './circuit-break.providers';
import { CircuitBreak } from './circuit-break';

@Module({
  providers: [CircuitBreak],
  exports: [CircuitBreak],
})
export class CircuitBreakModule {
  static forFeature(name: CircuitBreakProviderType[]): DynamicModule {
    const providers = createCircuitBreakProviders(name);
    return {
      module: CircuitBreakModule,
      providers,
      exports: providers,
    };
  }
}
