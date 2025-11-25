import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRecadoDto } from './dto/create-recado.dto';

@Injectable()
export class RecadosService {
  throwNotFoundError() {
    throw new NotFoundException('Recado not found');
  }

  findAll(): string {
    return 'This action returns all recados';
  }

  async create(createRecadoDto: CreateRecadoDto): Promise<string> {
    // Here you would typically handle the creation logic,
    // such as saving the recado to a database.
    return await 'This action adds a new recado';
  }
}
