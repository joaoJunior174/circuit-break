import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { IProductSearch } from '../product-search/use-cases/product-search';
import { SearchResponseType } from '../rapid-search/rapid-search-http/rapid-search.http';

@Controller('v1/product-search/api')
export class ApiRestController {
  constructor(private readonly productSearch: IProductSearch) {}

  @Post()
  @HttpCode(HttpStatus.ACCEPTED)
  async search(@Body() req): Promise<SearchResponseType> {
    return this.productSearch.search(req);
  }
}
