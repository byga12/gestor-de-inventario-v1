import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  DeleteDateColumn,
} from 'typeorm';
import { SaleItem } from './sale_item.entity';

@Entity()
export class Sale {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  datetime: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @OneToMany(() => SaleItem, (saleItem) => saleItem.sale, {
    cascade: true,
  })
  detail: SaleItem[];

  constructor(datetime: Date) {
    this.datetime = datetime;
  }
}
