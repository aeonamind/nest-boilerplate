import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class CatResponseDto {
  @Expose()
  @ApiProperty()
  id: number;

  @Expose()
  @ApiProperty()
  name: string;

  @Expose()
  @ApiProperty()
  age: string;
}
