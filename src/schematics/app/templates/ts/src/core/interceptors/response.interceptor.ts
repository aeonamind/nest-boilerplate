// custom.interceptor.ts

import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Response } from 'express';

import { HttpStatusCode } from '@core/constants';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const httpContext = context.switchToHttp();
    const response = httpContext.getResponse<Response>();

    // final place to handle data before res.json()
    return next.handle().pipe(
      map((data) => {
        return {
          status: response.statusCode,
          message: HttpStatusCode[response.statusCode],
          data: data ?? {},
        };
      }),
    );
  }
}
