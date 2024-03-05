import { Module } from '@nestjs/common';
import { InfrastructureModule } from './infrastructure/infrastructure.module';
import { ApiRestModule } from './presentation/api-rest.module';

@Module({
  imports: [InfrastructureModule, ApiRestModule],
})
export class AppModule {}
