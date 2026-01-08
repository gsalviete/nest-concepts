import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { tap } from 'rxjs';

export class TimingConnection implements NestInterceptor {
    async intercept(
        context: ExecutionContext,
        next: CallHandler<any>
    ){
        const now = Date.now();
        // console.log('timing connection running');

        await new Promise(resolve => setTimeout(resolve, 3000));
        return next.handle().pipe(
            tap(() => {
                const finalDate = Date.now() - now;
                // console.log(`next timing connection log with ${finalDate} ms` );
            })
        );
    }
}