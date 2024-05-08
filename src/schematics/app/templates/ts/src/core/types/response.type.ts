import { Type as NestType } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

type WrapOptions = {
  isArray?: boolean;
};

export function WrapResponseDto<T extends NestType<any>>(
  model: T,
  options?: WrapOptions,
) {
  const className = `Wrap${model.name}`;

  class WrapResponseDtoClass {
    @ApiProperty()
    status: number;

    @ApiProperty()
    message: string;

    @ApiProperty({
      type: () => model,
      isArray: options ? !!options.isArray : false,
    })
    @Type(() => model)
    data: T;
  }

  Object.defineProperty(WrapResponseDtoClass, 'name', { value: className }); // redefine the name of class

  return WrapResponseDtoClass;
}
