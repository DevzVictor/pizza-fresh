import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { handleError } from 'src/utils/handle-error.util';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrderService {
  constructor(private readonly prisma: PrismaService) {}

  create(userId: string, createOrderDto: CreateOrderDto) {
    const data: Prisma.OrderCreateInput = {
      user: {
        connect: {
          id: userId,
        },
      },
      table: {
        connect: {
          number: createOrderDto.tableNumber,
        },
      },
      products: {
        createMany: {
          data: createOrderDto.products.map((CreateOrderProductDto) => ({
            productId: CreateOrderProductDto.productId,
            quantity: CreateOrderProductDto.quantity,
            description: CreateOrderProductDto.description,
          })),
        },
      },

      // referencia logica para many-to-many explicit
      // products: {
      //   createMany: {
      //     data: [
      //       {
      //         productId: createOrderDto.products[0],
      //         quantity: 1,
      //         description: 'text',
      //       },
      //       {
      //         productId: createOrderDto.products[0],
      //         quantity: 1,
      //         description: 'text',
      //       },
      //     ],
      //   },
      // },

      // referencia da logica para (many-to-many implicit)
      // products: {
      //   connect: [
      //     {
      //       id: createOrderDto.products[0],
      //     },
      //     {
      //       id: createOrderDto.products[0],
      //     },
      //   ],
      // },
    };

    this.prisma.order
      .create({
        data,
        select: {
          id: true,
          table: { select: { number: true } },
          user: { select: { name: true } },
          products: {
            select: {
              quantity: true,
              description: true,
              product: { select: { name: true } },
            },
          },
        },
      })
      .catch(handleError);
  }

  findAll() {
    return this.prisma.order.findMany({
      select: {
        id: true,
        table: {
          select: {
            number: true,
          },
        },
        user: {
          select: {
            name: true,
          },
        },
        _count: {
          select: {
            products: true,
          },
        },
      },

      // Mostrar tudo dos objetos
      // include: {
      //   products: true,
      //   table: true,
      //   user: true,
      // },
    });
  }

  findOne(id: string) {
    return this.prisma.order.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            name: true,
          },
        },
        table: {
          select: {
            number: true,
          },
        },
        products: {
          select: {
            product: {
              select: {
                id: true,
                name: true,
                price: true,
                image: true,
                description: true,
              },
            },
          },
        },
      },
    });
  }
}
