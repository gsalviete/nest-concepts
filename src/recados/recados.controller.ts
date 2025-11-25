import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { RecadosService } from './recados.service';
import { CreateRecadoDto } from './dto/create-recado.dto';

@Controller('recados')
export class RecadosController {
  constructor(private readonly recadosService: RecadosService) {}
  @Get()
  findAll(): string {
    return 'This action returns all recados';
  }

  @Get(':id')
  findOne(@Param('id') id: string): string {
    return `This action returns a recado with id ${id}`;
  }

  @Post()
  async create(@Body() createRecadoDto: CreateRecadoDto): Promise<string> {
    return await this.recadosService.create(createRecadoDto);
  }
}
