import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  ParseIntPipe,
  Query,
  Inject,
} from '@nestjs/common';
import { RecadosService } from './recados.service';
import { CreateRecadoDto } from './dto/create-recado.dto';
import { UpdateRecadoDto } from './dto/update-recado.dto';
import { Recado } from './entities/recado.entity';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { ResponseRecadoDto } from './dto/reponse-recado.dto';
import { RegexProcotocol } from 'src/common/regex/protocol.regex';
import { SERVER_NAME } from 'src/common/constants/server-name';

@Controller('recados')
export class RecadosController {
  constructor(
    private readonly recadosService: RecadosService,
    @Inject(SERVER_NAME)
    private readonly serverName: string,
    private readonly regexProtocol: RegexProcotocol,
  ) {}

  @Get()
  async findAll(@Query() paginationDto: PaginationDto): Promise<Recado[]> {
    console.log(this.regexProtocol.execute(this.serverName));
    return this.recadosService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Recado> {
    return this.recadosService.findOne(id);
  }

  @Post()
  async create(@Body() createRecadoDto: CreateRecadoDto): Promise<ResponseRecadoDto> {
    return this.recadosService.create(createRecadoDto);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateRecadoDto: UpdateRecadoDto,
  ): Promise<Recado> {
    return this.recadosService.update(id, updateRecadoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): string {
    return `This action removes a recado with id ${id}`;
  }
}
