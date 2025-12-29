import { PartialType, PickType } from '@nestjs/mapped-types';
import { CreatePessoaDto } from './create-pessoa.dto';

export class UpdatePessoaDto extends PartialType(
  PickType(CreatePessoaDto, ['name', 'password']),
) {}
