import { HttpStatus } from '@nestjs/common';
import { Expose, Transform, Type, plainToInstance } from 'class-transformer';
import { ValidationError } from 'class-validator';

import { ErrorCodeType, CommonErrorCode } from '@core/constants';
import { Exception, IBaseError } from './exception';

export class ClassValidatorError implements IBaseError {
  @Expose({ name: 'property' })
  @Transform(
    ({ obj: { property } }) =>
      isNaN(Number(property)) &&
      `${property.toUpperCase()}_${CommonErrorCode.PROPERTY_INVALID}`,
  )
  code: ErrorCodeType = 'PROPERTY_INVALID';

  @Expose({ name: 'constraints' })
  @Transform(
    ({ obj: { constraints } }) => constraints && Object.values(constraints)[0],
  )
  message: string;

  @Expose()
  @Type(() => ClassValidatorError)
  @Transform(({ value }) => (value.length > 0 ? value : undefined))
  children?: ClassValidatorError[];
}

export class ClassValidatorException extends Exception {
  constructor(error: ValidationError) {
    super({
      ...plainToInstance(ClassValidatorError, error, {
        excludeExtraneousValues: true,
      }),
      status: HttpStatus.UNPROCESSABLE_ENTITY,
    });
  }
}
