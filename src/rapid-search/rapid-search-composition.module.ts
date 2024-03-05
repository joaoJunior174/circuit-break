import { Module } from '@nestjs/common';
import { RapidSearchHttpModule } from './rapid-search-http/rapid-search-http.module';
import {
  IRapidSearchCompositionService,
  RapidSearchCompositionService,
} from './rapid-search-composition.service';

@Module({
  imports: [RapidSearchHttpModule],
  providers: [
    {
      provide: IRapidSearchCompositionService,
      useClass: RapidSearchCompositionService,
    },
  ],
  exports: [IRapidSearchCompositionService],
})
export class RapidSearchCompositionModule {}
