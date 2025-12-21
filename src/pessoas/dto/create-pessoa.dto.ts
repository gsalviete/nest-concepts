import { IsString, IsNotEmpty, IsNumber, IsEmail } from 'class-validator';

export class CreatePessoaDto {
@IsString()
@IsNotEmpty()
nome: string;

@IsString()
@IsNotEmpty()
password: string;

@IsEmail()
@IsNotEmpty()
email: string;
}