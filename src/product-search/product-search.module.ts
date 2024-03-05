import { IProductSearch, ProductSearch } from './use-cases/product-search';
import { Module } from '@nestjs/common';
import { RapidSearchCompositionModule } from '../rapid-search/rapid-search-composition.module';
import { IProductReview, ProductReview } from './use-cases/product-review';

@Module({
  imports: [RapidSearchCompositionModule],
  providers: [
    { provide: IProductSearch, useClass: ProductSearch },
    { provide: IProductReview, useClass: ProductReview },
  ],
  exports: [IProductSearch, IProductReview],
})
export class ProductSearchModule {}
