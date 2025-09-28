import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column('decimal', { precision: 10, scale: 2 })
  unit_price: number;

  @DeleteDateColumn()
  deletedAt: Date;

  constructor(name: string, description: string, unit_price: number) {
    this.name = name;
    this.description = description;
    this.unit_price = unit_price;
  }
}
