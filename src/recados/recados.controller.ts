import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { RecadosService } from './recados.service';

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
  create(@Body() body: any): string {
    return `This action creates a new recado with title ${body.title} and content ${body.content}`;
  }
}
