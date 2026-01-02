import { BadRequestException, CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { catchError, Observable, throwError } from "rxjs";

export class ErrorHandling implements NestInterceptor{
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {

        return next.handle().pipe(
            catchError((error) => {
                console.log('error');
                return throwError(() => {
                    if(error.name === 'NotFoundException'){
                        return new BadRequestException(error.message);
                    }
                    return new BadRequestException('ocorreu um erro desonhecido');
                });
            })
        )
    }
}