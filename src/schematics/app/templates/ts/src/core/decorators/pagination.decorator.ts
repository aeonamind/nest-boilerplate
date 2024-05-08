import {
  ExecutionContext,
  applyDecorators,
  createParamDecorator,
} from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

import { SwaggerQueryKey } from '@core/swagger';
import { PaginateParams } from '@core/types';
import { ClassValidatorException } from '@core/exception';
import { createParamTypeEnhancer } from './param-type.enhancer';

const METADATA_PAGINATION_TYPE = Symbol('METADATA_PAGINATION_TYPE');

export const paginationQueryFactory = async (
  _: unknown,
  ctx: ExecutionContext,
) => {
  const request = ctx.switchToHttp().getRequest();

  const metatype = Reflect.getOwnMetadata(
    METADATA_PAGINATION_TYPE,
    ctx.getHandler(),
  );

  const paginateParams = plainToInstance<PaginateParams, unknown>(
    metatype,
    request.query as object,
  );

  const errors = await validate(paginateParams);

  if (errors.length != 0) {
    throw new ClassValidatorException(errors[0]);
  }

  const page = paginateParams.page ?? 1;
  const limit = paginateParams.limit ?? 10;

  return { page, limit };
};

export const PaginationQuery = createParamDecorator(paginationQueryFactory, [
  createParamTypeEnhancer(METADATA_PAGINATION_TYPE),
]);

export const ApiPagination = ({ required } = { required: false }) => {
  return applyDecorators(
    ApiQuery({
      name: SwaggerQueryKey.Page,
      description: 'Page number',
      required,
      example: 1,
    }),
    ApiQuery({
      name: SwaggerQueryKey.Limit,
      description: 'Number of rows',
      required,
      example: 10,
    }),
  );
};
