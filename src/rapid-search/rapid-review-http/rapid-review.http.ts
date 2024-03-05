import { Injectable } from '@nestjs/common';
import { AxiosInstance } from 'axios';
import { ApiHttp } from '../../infrastructure/api-http/api-http.decorator';
import { CircuitBreakHandle } from '../../infrastructure/circuit-break/circuit-break.decorator';

export type SearchResponseType = {
  status: string;
  request_id: string;
  data: unknown;
};

export abstract class IRapidReviewHttp {
  abstract review(query: string): Promise<SearchResponseType>;
}

@Injectable()
export class RapidReviewHttp implements IRapidReviewHttp {
  constructor(
    @ApiHttp(RapidReviewHttp.name)
    private readonly axiosInstance: AxiosInstance,
  ) {}

  @CircuitBreakHandle()
  async review(query: string): Promise<SearchResponseType> {
    const { data } = await this.axiosInstance.get('/product-reviews', {
      params: query,
    });
    return data;
  }
}
