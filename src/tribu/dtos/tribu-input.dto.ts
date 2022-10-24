import { REPOSITORY_STATE } from '@/tribu/utils';

import {
  Max,
  IsIn,
  IsDate,
  IsNotIn,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';

export class TribuInput {
  @IsOptional()
  @IsNotEmpty()
  @IsDate()
  date: Date;

  @IsOptional()
  @IsNotEmpty()
  @IsIn(Object.keys(REPOSITORY_STATE))
  state: string;

  @IsOptional()
  @IsNotEmpty()
  @IsNotIn([0])
  @Max(1)
  coverage: number;
}
