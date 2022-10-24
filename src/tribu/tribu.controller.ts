import { TribuService } from '@/tribu';

import { Get, Param, Controller } from '@nestjs/common';

@Controller('repositories/tribu')
export class TribuController {
  constructor(private readonly tribuService: TribuService) {}

  @Get()
  findAll() {
    return this.tribuService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.tribuService.findOne(id);
  }
}
