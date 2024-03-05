import { Injectable } from '@nestjs/common';
import {
  IRapidSearchHttp,
  SearchResponseType,
} from './rapid-search-http/rapid-search.http';

export abstract class IRapidSearchCompositionService {
  abstract search(query: string): Promise<SearchResponseType>;
}

@Injectable()
export class RapidSearchCompositionService
  implements IRapidSearchCompositionService
{
  constructor(private readonly rapidSearchHttp: IRapidSearchHttp) {}
  async search(query: string): Promise<SearchResponseType> {
    return this.rapidSearchHttp.search(query);
  }
}
