/* eslint-disable prettier/prettier */
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { PrismaService } from 'src/prisma/prisma.service';
import { handleError } from 'src/utils/handle-error.util';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  private userSelect = {
    id: true,
    nickname: true,
    name: true,
    password: false,
    image: true,
    createdAt: true,
    updatedAt: true,
  };

  constructor(private readonly prisma: PrismaService) {}

  findAll(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async findById(id: string): Promise<User> {
    const record = await this.prisma.user.findUnique({
      where: {
        id: id,
      },
    });

    if (!record) {
      throw new NotFoundException(`Registro com o ID '${id}' não encontrado`);
    }

    return record;
  }

  async findOne(id: string): Promise<User> {
    return this.findById(id);
  }

  async create(dto: CreateUserDto): Promise<User> {
    if (dto.password != dto.confirmPassword) {
      throw new BadRequestException('As senhas informadas não são iguais');
    }

    delete dto.confirmPassword;

    const user: User = {
      ...dto,
      id: randomUUID(),
      password: await bcrypt.hash(dto.password, 10),
    };

    return this.prisma.user
      .create({
        data: user,
        select: this.userSelect,
      })
      .catch(handleError);
  }

  async update(id: string, dto: UpdateUserDto): Promise<User> {
    await this.findById(id);

    if (dto.password) {
      if (dto.password != dto.confirmPassword) {
        throw new BadRequestException('As senhas informadas não são iguais');
      }
    }

    delete dto.confirmPassword;

    const user: Partial<User> = { ...dto };

    if (user.password) {
      user.password = await bcrypt.hash(user.password, 10);
    }

    return this.prisma.user
      .update({
        where: { id },
        data: user,
        select: this.userSelect,
      })
      .catch(handleError);
  }

  async delete(id: string) {
    await this.findById(id);

    await this.prisma.user.delete({
      where: { id },
    });
  }
}
