/* eslint-disable prettier/prettier */
import {
  Injectable,
  NotFoundException
} from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { PrismaService } from 'src/prisma/prisma.service';
import { handleError } from 'src/utils/handle-error.util';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(): Promise<Product[]> {
    return this.prisma.product.findMany();
  }

  async findById(id: string): Promise<Product> {
    const record = await this.prisma.product.findUnique({
      where: {
        id: id,
      },
    });

    if (!record) {
      throw new NotFoundException(`Registro com o ID '${id}' não encontrado`);
    }

    return record;
  }

  async findOne(id: string): Promise<Product> {
    return this.findById(id);
  }

  create(dto: CreateProductDto): Promise<Product> {
    const product: Product = { ...dto, id: randomUUID() };

    return this.prisma.product
      .create({
        data: product,
      })
      .catch(handleError);
  }

  async update(id: string, dto: UpdateProductDto): Promise<Product> {
    await this.findById(id);

    const product: Partial<Product> = { ...dto };

    return this.prisma.product
      .update({
        where: { id },
        data: product,
      })
      .catch(handleError);
  }

  async delete(id: string) {
    await this.findById(id);

    await this.prisma.product.delete({
      where: { id },
    });
  }

}
