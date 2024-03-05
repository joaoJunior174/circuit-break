import { Injectable } from '@nestjs/common';
import {
  CIRCUIT_BREAK_STATE,
  FAILURE_THRESHOLD,
  RESET_TIME,
  TIMEOUT_TIME,
} from './circuit-break.constants';

@Injectable()
export class CircuitBreak {
  private initalState = CIRCUIT_BREAK_STATE.CLOSED;
  private readonly failureCont = 0;
  private readonly failureThreshold = FAILURE_THRESHOLD;
  private readonly resetTime = RESET_TIME;
  private readonly timeout = TIMEOUT_TIME;

  async fire(state?: string): Promise<void> {
    if (state) {
      this.initalState = state;
    }
    console.log(this.initalState);
  }
}
