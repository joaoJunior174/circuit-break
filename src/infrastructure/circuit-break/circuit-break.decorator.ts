/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { CircuitBreak } from './circuit-break';

export const CircuitBreakHandle =
  (condition?: string): MethodDecorator =>
  (
    target: any,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor,
  ) => {
    const circuitBreak = new CircuitBreak();
    const originalMethod = descriptor.value;
    descriptor.value = async function (...args: any[]) {
      circuitBreak.fire(condition);
      return originalMethod.apply(this, args);
    };
    return descriptor;
  };
