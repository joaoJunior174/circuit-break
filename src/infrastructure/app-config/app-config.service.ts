import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppConfigService {
  constructor(private readonly configService: ConfigService) {}

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  get rapidApiValues() {
    return {
      fullUrl: this.configService.get<string>('RAPID_SEARCH_URL'),
      host: this.configService.get<string>('RAPID_SEARCH_HOST'),
      key: this.configService.get<string>('RAPID_SEARCH_KEY'),
    };
  }
}
