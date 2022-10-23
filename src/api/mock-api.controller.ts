import { MockApiService } from '@/api';

import { Controller, Get } from '@nestjs/common';

@Controller('mock')
export class MockApiController {
  constructor(private readonly mockApiService: MockApiService) {}

  @Get('repositories')
  loadRepositories() {
    return this.mockApiService.loadRepositories();
  }
}
