/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { CircuitBreak } from './circuit-break';

type Fallback = (...args: any[]) => any;
type CheckStatus = (...args: any[]) => any;
type FallbackError = {
  request: any;
  response: any;
  message: string;
};

type CircuitBreakArguments = {
  fallback: Fallback;
  checkStatus: CheckStatus;
};

export const CircuitBreakHandle =
  (circuiBreakArguments: CircuitBreakArguments): MethodDecorator =>
  (
    target: any,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor,
  ) => {
    const circuitBreak = new CircuitBreak();
    const originalMethod = descriptor.value;
    descriptor.value = async function (...args: any[]) {
      try {
        if (circuitBreak.canMakeRequest()) {
          const result = await originalMethod.apply(this, args);
          return result;
        }
      } catch (error) {
        const errorType: FallbackError = error;

        if (canExecuteCircuit(circuiBreakArguments, errorType)) {
          circuitBreak.execute();
        }
        return circuiBreakArguments.fallback({
          data: errorType.request,
          error: errorType.message,
        });
      }
    };
    return descriptor;
  };

function canExecuteCircuit(
  circuiBreakArguments: CircuitBreakArguments,
  error: FallbackError,
) {
  return !circuiBreakArguments.checkStatus(error.response.status);
}
