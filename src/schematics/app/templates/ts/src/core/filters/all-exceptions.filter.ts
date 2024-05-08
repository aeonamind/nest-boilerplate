import {
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  ExceptionFilter,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

import { LoggerService } from '@core/logger';
import { Exception, IException } from '@core/exception';
import {
  CommonErrorCode,
  errorCodeByStatus,
  shouldSkipPath,
} from '@core/constants';

@Catch()
export class AllExceptionsFilter<T> implements ExceptionFilter {
  constructor(
    readonly httpAdapterHost: HttpAdapterHost,
    readonly logger: LoggerService,
  ) {}

  catch(exception: T, host: ArgumentsHost) {
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();
    const request = ctx.getRequest();
    const response = ctx.getResponse();

    const responseBody = this.getException(exception);

    // log error
    if (!shouldSkipPath(request.url)) {
      this.logger.error({ request, statusCode: responseBody.error.status });
    }

    httpAdapter.reply(response, responseBody, responseBody.status);
  }

  getException(exception: T): Exception {
    if (exception instanceof Exception) {
      return exception;
    }

    if (exception instanceof HttpException) {
      const error: IException = {
        code:
          errorCodeByStatus[exception['status']] || CommonErrorCode.BAD_REQUEST,
        message: exception['response']['message'] || exception['message'],
        status: exception.getStatus(),
      };
      return new Exception(error);
    }

    if (exception instanceof Error) {
      console.error(exception);
      const error: IException = {
        code: 'INTERNAL_SERVER_ERROR',
        message: exception.message,
        status: HttpStatus.INTERNAL_SERVER_ERROR,
      };
      return new Exception(error);
    }
  }
}
