/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TableController } from './table.controller';

@Module({
  controllers: [TableController],
  providers: [],
})
export class TableModule {}
