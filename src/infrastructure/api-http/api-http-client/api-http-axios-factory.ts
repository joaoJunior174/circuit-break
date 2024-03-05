import { Injectable } from '@nestjs/common';
import { ApiHttpOptions } from '../api-http-options';
import axios, { AxiosInstance } from 'axios';
import { AppConfigService } from 'src/infrastructure/app-config/app-config.service';

@Injectable()
export class ApiHttpAxiosFactory {
  constructor(private readonly appConfigService: AppConfigService) {}
  create(
    options: Pick<ApiHttpOptions, 'microserviceFullPath' | 'key' | 'host'>,
  ): AxiosInstance {
    const axiosInstance = axios.create({
      baseURL: options.microserviceFullPath,
      headers: {
        'X-RapidAPI-Key': options.key,
        'X-RapidAPI-Host': options.host,
        'Content-Type': 'application/json',
      },
    });
    return axiosInstance;
  }
}
