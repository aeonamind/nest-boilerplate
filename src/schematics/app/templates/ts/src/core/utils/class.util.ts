import { Type } from '@nestjs/common';
import { OmitType, PickType } from '@nestjs/swagger';

import { snakeToPascal } from './transform-character.util';

/**
 * Creates a new DTO class by omitting specified keys from a given DTO class.
 * @param dto - The DTO class.
 * @param keys - The keys to be omitted from the DTO class.
 */
export const createOmitDto = <T>(dto: Type<T>, keys: (keyof T)[]) => {
  const className = `${dto.name}Omit${snakeToPascal(keys.join('_and_'))}`; // dynamic name for omit DTO class

  const OmitTypeClass = class extends OmitType(dto as any, keys as any) {};
  Object.defineProperty(OmitTypeClass, 'name', { value: className }); // redefine the name of class

  return OmitTypeClass;
};

/**
 * Creates a new DTO class by picking specified keys from a given DTO class.
 * @param dto - The DTO class.
 * @param keys - The keys to be picked from the DTO class.
 */
export const createPickDto = <T>(dto: Type<T>, keys: (keyof T)[]) => {
  const className = `${dto.name}Pick${snakeToPascal(keys.join('_and_'))}`; // dynamic name for pick DTO class

  const PickTypeClass = class extends PickType(dto as any, keys as any) {};
  Object.defineProperty(PickTypeClass, 'name', { value: className }); // redefine the name of class

  return PickTypeClass;
};
