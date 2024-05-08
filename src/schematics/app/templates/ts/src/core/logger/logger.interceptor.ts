import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { Request, Response } from 'express';

import { shouldSkipPath } from '@core/constants';
import { LoggerService } from './logger.service';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  constructor(private readonly logger: LoggerService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest<Request>();
    const { statusCode } = context.switchToHttp().getResponse<Response>();
    const path = request.url;

    // exclude some paths that won't be log
    if (shouldSkipPath(path)) return next.handle();

    return next.handle().pipe(
      tap(() => {
        this.logger.log({ request, statusCode });
      }),
    );
  }
}
