import { PartialType } from '@nestjs/mapped-types';
import { CreateOrganizationDto } from '@/organization/dto';

export class UpdateOrganizationDto extends PartialType(CreateOrganizationDto) {}
