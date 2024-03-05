import { Module } from '@nestjs/common';
import { RapidSearchHttpModule } from './rapid-search-http/rapid-search-http.module';
import {
  IRapidSearchCompositionService,
  RapidSearchCompositionService,
} from './rapid-search-composition.service';
import { RapidReviewHttpModule } from './rapid-review-http/rapid-review-http.module';

@Module({
  imports: [RapidSearchHttpModule, RapidReviewHttpModule],
  providers: [
    {
      provide: IRapidSearchCompositionService,
      useClass: RapidSearchCompositionService,
    },
  ],
  exports: [IRapidSearchCompositionService],
})
export class RapidSearchCompositionModule {}
