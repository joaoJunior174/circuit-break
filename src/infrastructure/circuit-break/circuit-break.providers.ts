import { Provider } from '@nestjs/common';
import { getCircuitBreakToken } from './circuit-break-token';
import { CircuitBreak } from './circuit-break';

export type CircuitBreakProviderType = {
  name: string;
};

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function createCircuitBreakProviders(
  circuitBreakProviderType: CircuitBreakProviderType[],
) {
  const providers: Provider[] = circuitBreakProviderType.map((o) => ({
    provide: getCircuitBreakToken(o.name),
    inject: [CircuitBreak],
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    useFactory: (circuitBreak: CircuitBreak) => {
      return circuitBreak;
    },
  }));
  return providers;
}
