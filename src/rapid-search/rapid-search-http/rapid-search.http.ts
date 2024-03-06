import { Injectable } from '@nestjs/common';
import { AxiosInstance } from 'axios';
import { ApiHttp } from '../../infrastructure/api-http/api-http.decorator';
import { CircuitBreakHandle } from '../../infrastructure/circuit-break/circuit-break.decorator';
import { fallbackReturn } from '../../core/fallback/fallback-error';

export type SearchResponseType = {
  status: string;
  request_id: string;
  data: unknown;
};

export abstract class IRapidSearchHttp {
  abstract search(query: string): Promise<SearchResponseType>;
}

@Injectable()
export class RapidSearchHttp implements IRapidSearchHttp {
  constructor(
    @ApiHttp(RapidSearchHttp.name)
    private readonly axiosInstance: AxiosInstance,
  ) {}

  @CircuitBreakHandle({
    fallback: fallbackReturn,
    checkStatus: (status) => {
      return status >= 400 && status <= 499;
    },
  })
  async search(query: string): Promise<SearchResponseType> {
    const { data } = await this.axiosInstance.get('/search', {
      params: query,
    });
    return data;
  }
}
