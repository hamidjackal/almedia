import {
  UseInterceptors,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  BadRequestException,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { success } from '../responses/success';
import { error } from '../responses/error';

export function SerializeResponse() {
  return UseInterceptors(new ResponseInterceptor());
}

export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {
    return handler.handle().pipe(
      catchError((err) => {
        console.log(err);
        const response = error(err);
        err =
          response?.error && !err.status
            ? new BadRequestException(response.error)
            : err;
        err.response = response;
        return throwError(() => err);
      }),
      map((data: any) => {
        return success(data);
      }),
    );
  }
}
