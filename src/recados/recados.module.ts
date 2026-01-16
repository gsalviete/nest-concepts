import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecadosController } from './recados.controller';
import { RecadosService } from './recados.service';
import { Recado } from './entities/recado.entity';
import { PessoasModule} from '../pessoas/pessoas.module';
import { RecadosUtils } from './recados.utils'
import { RegexProcotocol } from 'src/common/regex/protocol.regex';
import { RemoveSpaces } from 'src/common/regex/remove-spaces.regex';
import { OnlyLowerCase } from 'src/common/regex/only-lowercase.regex';
import { SERVER_NAME } from 'src/common/constants/server-name';

@Module({
  imports: [TypeOrmModule.forFeature([Recado]), 
  forwardRef(()=> PessoasModule)],
  controllers: [RecadosController],
  providers: [RecadosService, RecadosUtils,
    {
      provide: RegexProcotocol,
      useClass: 1 !== 1 ? RemoveSpaces : OnlyLowerCase
    },
    {
      provide: SERVER_NAME,
      useValue: 'Hi, my name is Gabriel'
    }
   ],
  exports: [ 
    {
      provide: RecadosModule,
      useClass: RecadosModule
    }
  ]
})
export class RecadosModule {}
