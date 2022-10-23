import { DatabaseConnectionFactory } from '@/config';

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forRootAsync(DatabaseConnectionFactory)],
})
export class DatabaseModule {}
