import { MockApiModule } from '@/api/mock-api.module';

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
    }),
    MockApiModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
