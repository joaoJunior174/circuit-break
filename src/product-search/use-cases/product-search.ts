import { Injectable } from '@nestjs/common';
import { IRapidSearchCompositionService } from '../../rapid-search/rapid-search-composition.service';
import { SearchResponseType } from '../../rapid-search/rapid-search-http/rapid-search.http';

export abstract class IProductSearch {
  abstract search(query: string): Promise<SearchResponseType>;
}

@Injectable()
export class ProductSearch implements IProductSearch {
  constructor(
    private readonly rapidSearchComposition: IRapidSearchCompositionService,
  ) {}

  async search(query: string): Promise<SearchResponseType> {
    return this.rapidSearchComposition.search(query);
  }
}
