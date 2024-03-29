import { Module } from '@nestjs/common';
import { ApiHttpModule } from '../../infrastructure/api-http/api-http.module';
import { IRapidSearchHttp, RapidSearchHttp } from './rapid-search.http';
import { CircuitBreakModule } from 'src/infrastructure/circuit-break/circuit-break.module';

@Module({
  imports: [
    ApiHttpModule.forFeature([
      {
        name: RapidSearchHttp.name,
        microserviceFullPath: process.env.RAPID_SEARCH_URL,
        key: process.env.RAPID_SEARCH_KEY,
        host: process.env.RAPID_SEARCH_HOST,
      },
    ]),
    CircuitBreakModule.forFeature([
      {
        name: RapidSearchHttp.name,
      },
    ]),
  ],
  providers: [
    {
      provide: IRapidSearchHttp,
      useClass: RapidSearchHttp,
    },
  ],
  exports: [IRapidSearchHttp],
})
export class RapidSearchHttpModule {}
