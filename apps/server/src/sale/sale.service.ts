import { Injectable } from '@nestjs/common';
import { CreateSaleDto } from './dto/create-sale.dto';
// import { UpdateSaleDto } from './dto/update-sale.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { Sale } from './entities/sale.entity';
import { SaleItem } from './entities/sale_item.entity';
import { Product } from '../product/entities/product.entity';

@Injectable()
export class SaleService {
  constructor(
    @InjectRepository(Sale)
    private readonly saleRepository: Repository<Sale>,
    // @InjectRepository(SaleItem)
    // private readonly saleItemRepository: Repository<SaleItem>,
    // @InjectRepository(Product)
    // private readonly productRepository: Repository<Product>,
    private dataSource: DataSource,
  ) {}

  async create(createSaleDto: CreateSaleDto) {
    await this.dataSource.transaction(async (entityManager) => {
      const sale = entityManager.create(Sale, {
        datetime: createSaleDto.datetime,
      });
      await entityManager.save(sale);
      for (const cartItem of createSaleDto.detail) {
        const product = await entityManager.findOneByOrFail(Product, {
          id: cartItem.product_uuid,
        });

        const saleItem = entityManager.create(SaleItem, {
          product_name: product.name,
          quantity: cartItem.quantity,
          unit_price: product.unit_price,
          sale: sale,
        });
        await entityManager.save(saleItem);
      }
    });
    return {
      message: 'Venta cargada',
    };
  }

  async findAll() {
    return await this.saleRepository.find({});
  }

  async findOne(id: string) {
    return await this.saleRepository.findOneByOrFail({ id });
  }

  // update(id: number, updateSaleDto: UpdateSaleDto) {
  //   return `This action updates a #${id} sale`;
  // }

  async remove(id: string) {
    const sale = await this.saleRepository.findOneOrFail({
      where: { id },
      relations: ['detail'],
    });
    return await this.saleRepository.softRemove(sale);
  }
}
