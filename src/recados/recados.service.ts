import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRecadoDto } from './dto/create-recado.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Recado } from './entities/recado.entity';


@Injectable()
export class RecadosService {
  constructor(
    @InjectRepository(Recado) private recadoRepository: Repository<Recado>
  ) {}

  throwNotFoundError() {
    throw new NotFoundException('Recado not found');
  }

  async findAll(): Promise<Recado[]> {
    return await this.recadoRepository.find();
  }

  async findOne(id: number): Promise<Recado> {
    const recado = await this.recadoRepository.findOneBy({ id});
    if(!recado){
      throw new NotFoundException(`Recado with id ${id} not found`);
    }
    return recado;
  }

  async create(createRecadoDto: CreateRecadoDto): Promise<Recado> {
    const recado = this.recadoRepository.create(createRecadoDto);
    return await this.recadoRepository.save(recado);
  }

  async update(id: number, updateRecadoDto: Partial<Recado>): Promise<Recado> {
    const recado = await this.recadoRepository.preload({
      id: id,
      ...updateRecadoDto,
    });
    if(!recado){
      throw new NotFoundException(`Recado with id ${id} not found`);
    }
    return await this.recadoRepository.save(recado);
  }

  async remove(id: number): Promise<void> {
    const recado = await this.recadoRepository.findOneBy({ id });
    if (!recado) {
      throw new NotFoundException(`Recado with id ${id} not found`);
    }
    await this.recadoRepository.remove(recado);
  }
}
