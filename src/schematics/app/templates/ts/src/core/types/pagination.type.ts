import { Type as NestType } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { IsNumber, IsOptional, IsPositive } from 'class-validator';

export class PaginateParams {
  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  @IsPositive()
  page: number;

  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  @IsPositive()
  limit: number;
}

export function PaginatedResponseDto<T extends NestType<any>>(model: T) {
  const className = `Pagination${model.name}`;

  class PaginationDtoClass {
    @Expose()
    @ApiProperty()
    page: number;

    @Expose()
    @ApiProperty()
    limit: number;

    @Expose()
    @ApiProperty()
    count: number;

    @Expose()
    @ApiProperty()
    totalRow: number;

    @Expose()
    @ApiProperty()
    totalPage: number;

    @Expose()
    @ApiProperty({
      type: () => model,
      isArray: true,
    })
    @Type(() => model)
    arr: T[];
  }

  Object.defineProperty(PaginationDtoClass, 'name', { value: className }); // redefine the name of class

  return PaginationDtoClass;
}
