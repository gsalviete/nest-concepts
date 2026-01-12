import { NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

export class SimpleMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        console.log('simple middleware says: hello!')

        res.setHeader('Cabecalho', 'do middleware')
        const authorization = req.headers?.authorization;

        if (authorization){
            req['user'] = {
                nome: 'Gabriel',
                sobrenome: 'Salviete'
            }
        }

        next();

        res.on('finish', ()=>{
            console.log('finish this middleware')
        } )
    }
}