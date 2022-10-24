import { TribuService } from '@/tribu';
import { TribuInput } from '@/tribu/dtos';

import { Response } from 'express';
import { Get, Param, Controller, Query, Res } from '@nestjs/common';

@Controller('repositories')
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

  @Get('/export/:id')
  export(@Param('id') id: number, @Res() res: Response) {
    return this.tribuService.export(id, res);
  }
}
