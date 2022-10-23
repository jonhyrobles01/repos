import { MockApiService, MockApiController } from '@/api';
import { AxiosFactory } from '@/config/httpAxios.provider';

import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule.registerAsync(AxiosFactory)],
  controllers: [MockApiController],
  providers: [MockApiService],
})
export class MockApiModule {}
