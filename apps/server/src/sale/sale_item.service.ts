import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SaleItem } from './entities/sale_item.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SaleItemService {
  constructor(
    @InjectRepository(SaleItem)
    private readonly saleItemRepository: Repository<SaleItem>,
  ) {}

  // async create();
}
