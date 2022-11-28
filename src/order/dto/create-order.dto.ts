import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsPositive, IsUUID, ValidateNested } from 'class-validator';
import { CreateOrderProductDto } from './create-order-product.dto';

export class CreateOrderDto {
  @IsUUID()
  @ApiProperty({
    description: 'Id do usuário que está criando o pedido',
    example: '12312-csa12321-cxzc1-sad123',
  })
  userId: string;

  @IsInt()
  @IsPositive()
  @ApiProperty({
    description: 'Numero da mesa que está realizando o pedido',
    example: '1',
  })
  tableNumber: number;

  @ValidateNested({
    each: true,
  })
  @Type(() => CreateOrderProductDto)
  @ApiProperty({
    description: 'Lista com os ID dos produtos que estão no pedido',
    type: [CreateOrderProductDto],
  })
  products: CreateOrderProductDto[];
}
