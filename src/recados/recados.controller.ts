import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { RecadosService } from './recados.service';
import { CreateRecadoDto } from './dto/create-recado.dto';
import { UpdateRecadoDto } from './dto/update-recado.dto';
import { Recado } from './entities/recado.entity';

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
  async create(@Body() createRecadoDto: CreateRecadoDto): Promise<Recado> {
    return this.recadosService.create(createRecadoDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRecadoDto: UpdateRecadoDto): string {
    return `This action updates a recado with id ${id}`;
  }

  @Delete(':id')
  remove(@Param('id') id: string): string {
    return `This action removes a recado with id ${id}`;
  }
}
