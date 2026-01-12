import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { Request } from "express";

export const ReqDataParam: (...dataOrPipes: any[]) => ParameterDecorator = createParamDecorator(
    (data: keyof Request, ctx: ExecutionContext) =>{
        const context = ctx.switchToHttp();
        const request: Request = context.getRequest();

        return request[data];
    }

)