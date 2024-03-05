import { IProductSearch, ProductSearch } from './use-cases/product-search';
import { Module } from '@nestjs/common';
import { RapidSearchCompositionModule } from '../rapid-search/rapid-search-composition.module';

@Module({
  imports: [RapidSearchCompositionModule],
  providers: [{ provide: IProductSearch, useClass: ProductSearch }],
  exports: [IProductSearch],
})
export class ProductSearchModule {}
