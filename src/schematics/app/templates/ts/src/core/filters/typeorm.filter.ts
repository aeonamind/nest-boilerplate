import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { QueryFailedError } from 'typeorm';

import { Exception } from '@core/exception';
import { CommonErrorCode } from '@core/constants';
import { AllExceptionsFilter } from './all-exceptions.filter';

@Catch(QueryFailedError)
export class TypeormExceptionFilter
  extends AllExceptionsFilter<QueryFailedError>
  implements ExceptionFilter
{
  override catch(exception: QueryFailedError, host: ArgumentsHost) {
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();
    const request = ctx.getRequest();
    const response = ctx.getResponse();

    let responseBody: Exception;
    // Duplicate name (use for unique fields in mysql)
    if (exception['code'] === 'ER_DUP_ENTRY') {
      responseBody = new Exception({
        code: CommonErrorCode.DUPLICATE_KEY,
        message: 'Duplicate key error. Please provide unique values.',
        status: HttpStatus.BAD_REQUEST,
      });
    } else responseBody = this.getException(exception);

    this.logger.error({ request, statusCode: responseBody.status });

    httpAdapter.reply(response, responseBody, responseBody.status);
  }
}
