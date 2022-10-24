import { TribuEntity } from '@/tribu/entities';
import { MockApiModule } from '@/api/mock-api.module';
import { TribuService, TribuController } from '@/tribu';

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([TribuEntity]), MockApiModule],
  controllers: [TribuController],
  providers: [TribuService],
})
export class TribuModule {}
