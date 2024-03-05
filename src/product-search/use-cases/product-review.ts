import { Injectable } from '@nestjs/common';
import { IRapidSearchCompositionService } from '../../rapid-search/rapid-search-composition.service';
import { SearchResponseType } from '../../rapid-search/rapid-search-http/rapid-search.http';

export abstract class IProductReview {
  abstract review(query: string): Promise<SearchResponseType>;
}

@Injectable()
export class ProductReview implements IProductReview {
  constructor(
    private readonly rapidSearchComposition: IRapidSearchCompositionService,
  ) {}

  async review(query: string): Promise<SearchResponseType> {
    return this.rapidSearchComposition.review(query);
  }
}
