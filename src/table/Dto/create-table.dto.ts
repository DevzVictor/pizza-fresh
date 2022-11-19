/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsPositive } from 'class-validator';

export class CreateTableDto {
  @IsNumber()
  @IsPositive()
  @ApiProperty({
    description: "O numero da mesa",
    example: 1,
  })
  number: number;
}
