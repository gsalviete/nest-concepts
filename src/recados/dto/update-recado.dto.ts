import { IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class UpdateRecadoDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  @MinLength(10)
  @IsOptional()
  readonly texto?: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  @MinLength(10)
  @IsOptional()
  readonly de?: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  @MinLength(10)
  @IsOptional()
  readonly para?: string;
}
