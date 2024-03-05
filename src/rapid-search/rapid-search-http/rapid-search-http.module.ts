import { Module } from '@nestjs/common';
import { ApiHttpModule } from '../../infrastructure/api-http/api-http.module';
import { IRapidSearchHttp, RapidSearchHttp } from './rapid-search.http';

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
