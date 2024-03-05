import { Module } from '@nestjs/common';
import { ApiHttpAxiosFactory } from './api-http-axios-factory';

@Module({
  providers: [ApiHttpAxiosFactory],
  exports: [ApiHttpAxiosFactory],
})
export class ApiHttpClientModule {}
