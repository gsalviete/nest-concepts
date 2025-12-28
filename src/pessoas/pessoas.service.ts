import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
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
    try{const pessoa = this.pessoaRepository.create(createPessoaDto);
    return await this.pessoaRepository.save(pessoa);}
    catch(error){
      if (error.code === '23505') {
        throw new ConflictException('Email already exists');
      }
      throw error;
    }
  }

  async update(id: number, updatePessoaDto: UpdatePessoaDto): Promise<Pessoa> {
    const pessoa = await this.pessoaRepository.preload({
      id: id,
      ...updatePessoaDto,
    });
    if(!pessoa) {
      throw new NotFoundException(`Pessoa with id ${id} not found`) 
    }
    return await this.pessoaRepository.save(pessoa)
  }

  async remove(id: number): Promise<void> {
    const pessoa = await this.pessoaRepository.findOne({ where: {id}});
    if(!pessoa){
      throw new NotFoundException(`Pessoa with id ${id} not found`);
    }
    await this.pessoaRepository.remove(pessoa);
  }
}
