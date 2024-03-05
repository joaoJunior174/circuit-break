import { Injectable } from '@nestjs/common';
import {
  IRapidSearchHttp,
  SearchResponseType,
} from './rapid-search-http/rapid-search.http';
import { IRapidReviewHttp } from './rapid-review-http/rapid-review.http';

export abstract class IRapidSearchCompositionService {
  abstract search(query: string): Promise<SearchResponseType>;
  abstract review(query: string): Promise<SearchResponseType>;
}

@Injectable()
export class RapidSearchCompositionService
  implements IRapidSearchCompositionService
{
  constructor(
    private readonly rapidSearchHttp: IRapidSearchHttp,
    private readonly rapidReviewHttp: IRapidReviewHttp,
  ) {}

  async search(query: string): Promise<SearchResponseType> {
    return this.rapidSearchHttp.search(query);
  }

  async review(query: string): Promise<SearchResponseType> {
    return this.rapidReviewHttp.review(query);
  }
}
