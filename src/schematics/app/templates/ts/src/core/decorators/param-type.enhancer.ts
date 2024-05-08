import { ParamDecoratorEnhancer } from '@nestjs/common';

/**
 * This function is for creating a function that can get metadata in custom decorators
 * @param metadataKey - The metadata key.
 */
export const createParamTypeEnhancer =
  (metadataKey: symbol): ParamDecoratorEnhancer =>
  (
    target: Record<string, unknown>,
    propertyKey: string,
    parameterIndex: number,
  ): void => {
    const paramTypes = Reflect.getOwnMetadata(
      'design:paramtypes',
      target,
      propertyKey,
    );
    const metatype = paramTypes[parameterIndex];
    Reflect.defineMetadata(metadataKey, metatype, target[propertyKey]);
  };
