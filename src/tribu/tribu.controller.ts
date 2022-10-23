import { TribuService } from '@/tribu';
import { CreateTribuDto, UpdateTribuDto } from '@/tribu/dto';

import {
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Controller,
} from '@nestjs/common';

@Controller('tribu')
export class TribuController {
  constructor(private readonly tribuService: TribuService) {}

  @Post()
  create(@Body() createTribuDto: CreateTribuDto) {
    return this.tribuService.create(createTribuDto);
  }

  @Get()
  findAll() {
    return this.tribuService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tribuService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTribuDto: UpdateTribuDto) {
    return this.tribuService.update(+id, updateTribuDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tribuService.remove(+id);
  }
}
