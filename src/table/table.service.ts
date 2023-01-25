/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { PrismaService } from '../prisma/prisma.service';
import { handleError } from '../utils/handle-error.util';
import { CreateTableDto } from './dto/create-table.dto';
import { UpdateTableDto } from './dto/update-table.dto';
import { Table } from './entities/table.entity';

@Injectable()
export class TableService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(): Promise<Table[]> {
    return this.prisma.table.findMany();
  }

  async findById(id: string): Promise<Table> {
    const record = await this.prisma.table.findUnique({
      where: {
        id: id,
      },
    });

    if (!record) {
      throw new NotFoundException(`Registro com o ID '${id}' não encontrado`);
    }

    return record;
  }

  async findOne(id: string): Promise<Table> {
    return this.findById(id);
  }

  create(dto: CreateTableDto): Promise<Table> {
    const table: Table = { ...dto, id: randomUUID() };

    return this.prisma.table
      .create({
        data: table,
      })
      .catch(handleError);
  }

  async update(id: string, dto: UpdateTableDto): Promise<Table> {
    await this.findById(id);

    const table: Partial<Table> = { ...dto };

    return this.prisma.table
      .update({
        where: { id },
        data: table,
      })
      .catch(handleError);
  }

  async delete(id: string): Promise<void> {
    await this.findById(id);

    await this.prisma.table.delete({
      where: { id },
    });
  }
}
