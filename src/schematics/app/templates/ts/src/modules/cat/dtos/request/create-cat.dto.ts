import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateCatDto {
  @ApiProperty()
  @MinLength(5)
  @MaxLength(50)
  @IsString()
  name: string;

  @ApiProperty()
  @IsNumber()
  age: number;
}
