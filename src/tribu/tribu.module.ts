import { TribuService, TribuController } from '@/tribu';

import { Module } from '@nestjs/common';

@Module({
  controllers: [TribuController],
  providers: [TribuService],
})
export class TribuModule {}
