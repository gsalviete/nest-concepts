import { NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

export class SimpleMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        console.log('simple middleware says: hello!')

        return res.status(404).send({
            message: 'Not Found'
        })
    }
}