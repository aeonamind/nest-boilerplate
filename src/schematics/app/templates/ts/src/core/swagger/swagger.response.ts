import { HttpStatus } from '@nestjs/common';

import { ApiSuccessMessage, ApiErrorMessage } from '@core/constants';
import { WrapResponseDto } from '@core/types';

type ResponseOptions = {
  type: any;
  isArray?: boolean;
  description?: string;
};

export const swaggerResponse = {
  createSuccess(options: ResponseOptions) {
    return {
      status: HttpStatus.CREATED,
      type: WrapResponseDto(options.type, { isArray: options.isArray }),
      description: options.description ?? ApiSuccessMessage.Created,
    };
  },

  getSuccess(options: ResponseOptions) {
    return {
      status: HttpStatus.OK,
      type: WrapResponseDto(options.type, { isArray: options.isArray }),
      description: options.description ?? ApiSuccessMessage.Ok,
    };
  },

  updateSuccess(options: ResponseOptions) {
    return {
      status: HttpStatus.OK,
      type: WrapResponseDto(options.type, { isArray: options.isArray }),
      description: options.description ?? ApiSuccessMessage.Updated,
    };
  },

  deleteSuccess() {
    return {
      status: HttpStatus.NO_CONTENT,
      description: ApiSuccessMessage.Deleted,
    };
  },

  badRequest() {
    return {
      status: HttpStatus.BAD_REQUEST,
      description: ApiErrorMessage.BadRequest,
    };
  },

  notFound() {
    return {
      status: HttpStatus.NOT_FOUND,
      description: ApiErrorMessage.NotFound,
    };
  },

  forbidden() {
    return {
      status: HttpStatus.FORBIDDEN,
      description: ApiErrorMessage.Forbidden,
    };
  },

  unAuthorized() {
    return {
      status: HttpStatus.UNAUTHORIZED,
      description: ApiErrorMessage.Unauthorized,
    };
  },

  internalServerError() {
    return {
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      description: ApiErrorMessage.InternalServerError,
    };
  },
};
