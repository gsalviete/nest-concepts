import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecadosController } from './recados.controller';
import { RecadosService } from './recados.service';
import { Recado } from './entities/recado.entity';
import { PessoasModule} from '../pessoas/pessoas.module';
import { RecadosUtils } from './recados.utils'

@Module({
  imports: [TypeOrmModule.forFeature([Recado]), 
  forwardRef(()=> PessoasModule)],
  controllers: [RecadosController],
  providers: [RecadosService, RecadosUtils ],
  exports: [ 
    {
      provide: RecadosModule,
      useClass: RecadosModule
    }
  ]
})
export class RecadosModule {}
