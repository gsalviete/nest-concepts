import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecadosModule } from 'src/recados/recados.module';
import { Recado } from 'src/recados/entities/recado.entity';
import { PessoasModule } from 'src/pessoas/pessoas.module';
import { Pessoa } from 'src/pessoas/entities/pessoa.entity';
import { SimpleMiddleware } from 'src/common/middlewares/simple-middleware';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { NewExceptionFilter } from 'src/common/filters/new-exception.filter';
import { IsAdminGuard } from 'src/common/guards/is-admin.guard';

@Module({
  imports: [
    RecadosModule,
    PessoasModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT!) || 5432,
      username: process.env.DATABASE_USER || 'postgres',
      password: process.env.DATABASE_PASSWORD || 'postgres',
      database: process.env.DATABASE_NAME || 'nestdb',
      entities: [Recado, Pessoa],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: NewExceptionFilter
    },
    {
      provide: APP_GUARD,
      useClass: IsAdminGuard
    }
  ],
})
export class AppModule implements NestModule { 
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(SimpleMiddleware).forRoutes({
      path: 'recados',
      method: RequestMethod.ALL,
    })
  }
}
