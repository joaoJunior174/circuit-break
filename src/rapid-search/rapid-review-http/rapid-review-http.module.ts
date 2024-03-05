import { Module } from '@nestjs/common';
import { ApiHttpModule } from '../../infrastructure/api-http/api-http.module';
import { CircuitBreakModule } from 'src/infrastructure/circuit-break/circuit-break.module';
import { RapidReviewHttp, IRapidReviewHttp } from './rapid-review.http';

@Module({
  imports: [
    ApiHttpModule.forFeature([
      {
        name: RapidReviewHttp.name,
        microserviceFullPath: process.env.RAPID_SEARCH_URL,
        key: process.env.RAPID_SEARCH_KEY,
        host: process.env.RAPID_SEARCH_HOST,
      },
    ]),
    CircuitBreakModule.forFeature([
      {
        name: RapidReviewHttp.name,
      },
    ]),
  ],
  providers: [
    {
      provide: IRapidReviewHttp,
      useClass: RapidReviewHttp,
    },
  ],
  exports: [IRapidReviewHttp],
})
export class RapidReviewHttpModule {}
