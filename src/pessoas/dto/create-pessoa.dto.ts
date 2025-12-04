import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreatePessoaDto {
@IsString()
@IsNotEmpty()
nome: string;

@IsNumber()
@IsNotEmpty()
idade: number;
}