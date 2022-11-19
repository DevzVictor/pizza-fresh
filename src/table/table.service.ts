/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CreateTableDto } from './Dto/create-table.dto';

@Injectable()
export class TableService {

  findAll() {
    return 'Buscar todas as mesas';
  }
  create(createTableDto: CreateTableDto) {
    return 'Criar uma mesa';
  }
}
