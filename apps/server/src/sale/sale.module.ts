import { Module } from '@nestjs/common';
import { SaleService } from './sale.service';
import { SaleController } from './sale.controller';
import { SaleItemService } from './sale_item.service';
import { ProductModule } from 'src/product/product.module';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sale } from './entities/sale.entity';
import { SaleItem } from './entities/sale_item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Sale, SaleItem]), ProductModule],
  controllers: [SaleController],
  providers: [SaleService, SaleItemService, JwtService],
})
export class SaleModule {}
