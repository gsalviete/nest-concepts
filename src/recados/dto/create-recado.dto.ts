import { IsNotEmpty, IsString, MaxLength, MinLength, IsPositive, IsNumber } from 'class-validator';

export class CreateRecadoDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  @MinLength(10)
  readonly texto?: string;

  @IsNumber()
  @IsPositive()
  deId: number;

  @IsNumber()
  @IsPositive()
  paraId: number;
}
