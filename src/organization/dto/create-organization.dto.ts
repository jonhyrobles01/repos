import { MaxLength, IsNotEmpty, IsString } from 'class-validator';

export class CreateOrganizationDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  name: string;
}
