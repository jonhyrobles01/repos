import {
  CreateOrganizationDto,
  UpdateOrganizationDto,
} from '@/organization/dto';
import { OrganizationService } from '@/organization';

import {
  Get,
  Put,
  Post,
  Body,
  Param,
  Delete,
  Controller,
} from '@nestjs/common';

@Controller('organization')
export class OrganizationController {
  constructor(private readonly organizationService: OrganizationService) {}

  @Post()
  create(@Body() createOrganizationDto: CreateOrganizationDto) {
    return this.organizationService.create(createOrganizationDto);
  }

  @Get()
  findAll() {
    return this.organizationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.organizationService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() updateOrganizationDto: UpdateOrganizationDto,
  ) {
    return this.organizationService.update(id, updateOrganizationDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    try {
      await this.organizationService.remove(id);

      return this.findAll();
    } catch (error) {
      return this.findAll();
    }
  }
}
