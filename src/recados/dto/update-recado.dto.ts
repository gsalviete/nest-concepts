import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class UpdateRecadoDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  @MinLength(10)
  readonly texto?: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  @MinLength(10)
  readonly de?: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  @MinLength(10)
  readonly para?: string;
}
