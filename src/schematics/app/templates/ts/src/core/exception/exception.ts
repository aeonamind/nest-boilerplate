import { ErrorCodeType } from '@core/constants';
import { HttpStatus } from '@nestjs/common';

export interface IBaseError {
  code: ErrorCodeType;
  message: string;
}

export interface IException extends IBaseError {
  status?: number;
}

export class Exception extends Error {
  public status: number;
  public error: IException;

  constructor(error: IException) {
    super();
    this.name = this.constructor.name;
    this.error = error;
    this.error.status = error.status ?? HttpStatus.BAD_REQUEST;

    Error.captureStackTrace(this, this.constructor);
  }

  toJSON() {
    return this.error;
  }
}
