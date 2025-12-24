import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class CreatePessoaDto {
@IsString()
@IsNotEmpty()
name: string;

@IsString()
@IsNotEmpty()
password: string;

@IsEmail()
@IsNotEmpty()
email: string;
}