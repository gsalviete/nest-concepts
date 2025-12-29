import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRecadoDto } from './dto/create-recado.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Recado } from './entities/recado.entity';
import { UpdateRecadoDto } from './dto/update-recado.dto';
import { PessoasService } from '../pessoas/pessoas.service';
import { CreatePessoaDto } from 'src/pessoas/dto/create-pessoa.dto';
import { ResponseRecadoDto } from './dto/reponse-recado.dto';

@Injectable()
export class RecadosService {
  constructor(
    @InjectRepository(Recado) private recadoRepository: Repository<Recado>,
    private pessoasService: PessoasService
  ) {}

  throwNotFoundError() {
    throw new NotFoundException('Recado not found');
  }

  async findAll(): Promise<Recado[]> {
    return await this.recadoRepository.find();
  }

  async findOne(id: number): Promise<Recado> {
    const recado = await this.recadoRepository.findOne({ where: { id } });
    if (!recado) {
      throw new NotFoundException(`Recado with id ${id} not found`);
    }
    return recado;
  }

  async create(createRecadoDto: CreateRecadoDto): Promise<ResponseRecadoDto> {
    const { deId, paraId } = createRecadoDto;
    const de = await this.pessoasService.findOne(deId);
    const para = await this.pessoasService.findOne(paraId);

    const novoRecado = {
      texto: createRecadoDto.texto,
      de: de,
      para: para,
      lido: false,
      data: new Date(),
    };
    const recado = this.recadoRepository.create(novoRecado);
    await this.recadoRepository.save(recado);
    return {
      ...recado,
      de: {
        id: recado.de.id
      },
      para: {
        id: recado.para.id 
      }
    }; 
  }

  async update(id: number, updateRecadoDto: UpdateRecadoDto): Promise<Recado> {
    const recado = await this.recadoRepository.preload({
      id: id,
      ...updateRecadoDto,
    });
    if (!recado) {
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
