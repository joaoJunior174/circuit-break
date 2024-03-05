import { Module } from '@nestjs/common';
import { ProductSearchModule } from '../product-search/product-search.module';
import { ApiRestController } from './api-rest.controller';

@Module({
  imports: [ProductSearchModule],
  controllers: [ApiRestController],
})
export class ApiRestModule {}
