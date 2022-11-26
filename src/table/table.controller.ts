/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateTableDto } from './dto/create-table.dto';
import { Table } from './entities/table.entity';
import { TableService } from './table.service';

@ApiTags('table')
@Controller('table')
export class TableController {
  constructor(private tableService: TableService) {}

  @Get()
  @ApiOperation({
    summary: "Visualizar todas mesas"
  })
  findAll(): Promise<Table[]> {
    return this.tableService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: "Visualizar uma mesas"
  })
  findOne(@Param('id') id: string): Promise<Table> {
    return this.tableService.findOne(id);
  }

  @Post()
  @ApiOperation({
    summary: "Criar uma mesas"
  })
  create(@Body() dto: CreateTableDto): Promise<Table> {
    return this.tableService.create(dto);
  }
}
