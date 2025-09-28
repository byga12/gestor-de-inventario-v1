import {
  Entity,
  Column,
  ManyToOne,
  PrimaryGeneratedColumn,
  DeleteDateColumn,
} from 'typeorm';
import { Sale } from './sale.entity';

@Entity()
export class SaleItem {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Sale, (sale) => sale.detail)
  sale: Sale;

  @Column()
  product_name: string;

  @Column()
  quantity: number;

  @Column('decimal', { precision: 10, scale: 2 })
  unit_price: number;

  @DeleteDateColumn()
  deletedAt: Date;

  constructor(product_name: string, quantity: number, unit_price: number) {
    this.product_name = product_name;
    this.quantity = quantity;
    this.unit_price = unit_price;
  }
}
