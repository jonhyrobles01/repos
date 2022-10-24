import { AxiosFactory } from '@/config';
import { MockApiService, MockApiController } from '@/api';

import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule.registerAsync(AxiosFactory)],
  controllers: [MockApiController],
  providers: [MockApiService],
  exports: [MockApiService],
})
export class MockApiModule {}
