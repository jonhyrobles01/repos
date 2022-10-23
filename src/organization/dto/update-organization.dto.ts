import { CreateOrganizationDto } from '@/organization/dto';

import { PartialType } from '@nestjs/mapped-types';
import { IsOptional, IsNotEmpty, IsIn } from 'class-validator';

export class UpdateOrganizationDto extends PartialType(CreateOrganizationDto) {
  @IsOptional()
  @IsNotEmpty()
  @IsIn([0, 1])
  status: number;
}
