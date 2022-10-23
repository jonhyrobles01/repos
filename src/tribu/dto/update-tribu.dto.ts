import { CreateTribuDto } from '@/tribu/dto';

import { PartialType } from '@nestjs/mapped-types';

export class UpdateTribuDto extends PartialType(CreateTribuDto) {}
