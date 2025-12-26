import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePessoaDto } from './dto/create-pessoa.dto';
import { UpdatePessoaDto } from './dto/update-pessoa.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Pessoa } from './entities/pessoa.entity';
import { Repository } from 'typeorm/repository/Repository';

@Injectable()
export class PessoasService {
  constructor(
    @InjectRepository(Pessoa) private pessoaRepository: Repository<Pessoa>
  ) {}

  async findAll(): Promise<Pessoa[]> {
    const pessoas = await this.pessoaRepository.find();
    return pessoas;
  }

  async findOne(id: number): Promise<Pessoa> {
    const pessoa = await this.pessoaRepository.findOneBy({ id });
    if (!pessoa) { throw new NotFoundException(`Pessoa with id ${id} not found`); }
    return pessoa;
  }

  async create(createPessoaDto: CreatePessoaDto): Promise<Pessoa> {
    const pessoa = this.pessoaRepository.create(createPessoaDto);
    return await this.pessoaRepository.save(pessoa);
  }

  update(id: number, updatePessoaDto: UpdatePessoaDto) {
    return `This action updates a #${id} pessoa`;
  }

  remove(id: number) {
    return `This action removes a #${id} pessoa`;
  }
}
