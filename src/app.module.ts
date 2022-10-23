import { MockApiModule } from '@/api/mock-api.module';
import { DatabaseModule } from '@/database/database.module';

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
    }),
    DatabaseModule,
    MockApiModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
