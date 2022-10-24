import { TribuService } from '@/tribu';
import { TribuInput } from '@/tribu/dtos';

import { Get, Param, Controller, Query } from '@nestjs/common';

@Controller('repositories/tribu')
export class TribuController {
  constructor(private readonly tribuService: TribuService) {}

  @Get()
  findAll(@Query() tribuInput: TribuInput) {
    console.log(tribuInput);
    return this.tribuService.findAll(tribuInput);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.tribuService.findOne(id);
  }
}
