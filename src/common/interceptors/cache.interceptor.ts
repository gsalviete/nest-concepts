import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { of, tap } from "rxjs";

export class Cache implements NestInterceptor {
    private readonly cache = new Map();
    
    async intercept(context: ExecutionContext, next: CallHandler<any>) {
        
        console.log('interceptor being executed');
        const request = context.switchToHttp().getRequest();
        const url = request.url;

        if (this.cache.has(url)){
            console.log('already in cache')
            return of (this.cache.get(url))
        }

        await new Promise(resolve => setTimeout(resolve, 3000));
        
        return next.handle().pipe(
            tap(data => {
                this.cache.set(url, data);
                console.log('storaged in cache');
            })
        );
    }
}