import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecadosModule } from 'src/recados/recados.module';
import { Recado } from 'src/recados/entities/recado.entity';
import { PessoasModule } from 'src/pessoas/pessoas.module';
import { Pessoa } from 'src/pessoas/entities/pessoa.entity';
import { ConfigModule } from '@nestjs/config';
import * as Joi from '@hapi/joi';

@Module({
  imports: [
    RecadosModule,
    PessoasModule,
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        TYPE: Joi.required()
      })
    }), 
    TypeOrmModule.forRoot({
      type: process.env.TYPE as 'postgres',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT!) || 5432,
      username: process.env.DATABASE_USERNAME || 'postgres',
      password: process.env.DATABASE_PASSWORD || 'postgres',
      database: process.env.DATABASE_NAME || 'nestdb',
      entities: [Recado, Pessoa],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [ AppService ],
})
export class AppModule {}

