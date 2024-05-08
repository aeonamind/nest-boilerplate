import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  SetMetadata,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable, map } from 'rxjs';
import { ClassConstructor, plainToInstance } from 'class-transformer';

const SERIALIZE_CLASS = Symbol('SerializeClass');

/**
 * Decorator uses with CustomClassSerializerInterceptor to serialize response data based on response DTO.
 * @param serializeClass - The response DTO class.
 */
export const SerializeClass = (serializeClass: ClassConstructor<unknown>) =>
  SetMetadata(SERIALIZE_CLASS, serializeClass);

@Injectable()
export class CustomClassSerializerInterceptor implements NestInterceptor {
  constructor(private reflector: Reflector) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const serializeClass = this.reflector.getAllAndOverride<
      ClassConstructor<unknown>
    >(SERIALIZE_CLASS, [context.getHandler(), context.getClass()]);

    return next.handle().pipe(
      map((data) =>
        plainToInstance(serializeClass, data, {
          excludeExtraneousValues: true,
        }),
      ),
    );
  }
}
