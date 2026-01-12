import { CallHandler, ExecutionContext, Injectable, NestInterceptor, UnauthorizedException } from "@nestjs/common";

@Injectable()
export class AuthToken implements NestInterceptor {
    async intercept(
        context: ExecutionContext,
        next: CallHandler<any>
    ){
        const request = context.switchToHttp().getRequest();
        const token = request.headers.authorization.split(' ')[1];

        if(!token || token != '123456'){
            throw new UnauthorizedException('user need to login');  
        }
        console.log(`seu token é `, token);
        return next.handle();
    }
}