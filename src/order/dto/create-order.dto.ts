import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsPositive, IsUUID } from 'class-validator';

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

  @IsUUID(undefined, { each: true })
  @ApiProperty({
    description: 'Lista com os ID dos produtos que estão no pedido',
    example: '[12312-csa12321-cxzc1-sad123, 312-csa12321-cxzc1-sad123]',
  })
  products: string[];
}
