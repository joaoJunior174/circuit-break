import { Injectable, Logger } from '@nestjs/common';
import {
  CIRCUIT_BREAK_STATE,
  FAILURE_THRESHOLD,
  RESET_TIME,
  TIMEOUT_TIME,
} from './circuit-break.constants';

@Injectable()
export class CircuitBreak {
  private logger = new Logger();
  private currentState = CIRCUIT_BREAK_STATE.CLOSED;
  private failureCont = 0;
  private readonly failureThreshold = FAILURE_THRESHOLD;
  private readonly resetTime = RESET_TIME;
  private readonly timeout = TIMEOUT_TIME;
  private resetTimer: NodeJS.Timeout | null = null;

  //this state indicates if the current situation is failure (false) or sucess(true)
  execute(): void {
    this.failureCont += 1;
    if (this.canOpen()) {
      this.logger.verbose('Circuit breaker state changed to OPEN');
      return this.open();
    }
  }

  canOpen(): boolean {
    return (
      this.failureCont > this.failureThreshold &&
      (this.currentState === CIRCUIT_BREAK_STATE.CLOSED ||
        this.currentState === CIRCUIT_BREAK_STATE.HALF_OPENED)
    );
  }

  canMakeRequest(): boolean {
    return (
      this.currentState === CIRCUIT_BREAK_STATE.CLOSED ||
      this.currentState === CIRCUIT_BREAK_STATE.HALF_OPENED
    );
  }

  open(): void {
    this.failureCont = 0;
    this.currentState = CIRCUIT_BREAK_STATE.OPENED;

    this.resetTimer = setTimeout(() => {
      this.logger.verbose('Circuit breaker state changed to HALF-OPEN');
      this.currentState = CIRCUIT_BREAK_STATE.HALF_OPENED;
      this.failureCont = FAILURE_THRESHOLD;
    }, this.resetTime);
  }
}
