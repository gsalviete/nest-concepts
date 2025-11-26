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

  findAll(): Promise<Recado[]> {
    return this.recadoRepository.find();
  }

  async create(createRecadoDto: CreateRecadoDto): Promise<Recado> {
    const recado = this.recadoRepository.create(createRecadoDto);
    return await this.recadoRepository.save(recado);
  }
}
