import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { map } from "rxjs";

export class ChangeData implements NestInterceptor {    
    async intercept(context: ExecutionContext, next: CallHandler<any>) {
        
        console.log('data interceptor being executed');
        const request = context.switchToHttp().getRequest();
        const url = request.url;
        await new Promise(resolve => setTimeout(resolve, 3000));
        
        return next.handle().pipe(
            map(data => {
                if( Array.isArray(data)){
                    return {
                        data,
                        count: data.length,
                    }
                }
                return data;
            })
        );
    }
}