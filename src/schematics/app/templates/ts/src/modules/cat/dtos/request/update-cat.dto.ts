import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumber,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class UpdateCatDto {
  @ApiProperty({ required: false })
  @MinLength(5)
  @MaxLength(50)
  @IsString()
  @IsOptional()
  name: string;

  @ApiProperty({ required: false })
  @Min(1)
  @Max(50)
  @IsNumber()
  @IsOptional()
  age: number;
}
