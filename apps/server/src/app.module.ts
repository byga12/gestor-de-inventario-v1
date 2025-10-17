import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { User } from './user/entities/user.entity';
import { DataSource } from 'typeorm';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { Product } from './product/entities/product.entity';
import { SaleModule } from './sale/sale.module';
import { Sale } from './sale/entities/sale.entity';
import { SaleItem } from './sale/entities/sale_item.entity';
import { DashboardModule } from './dashboard/dashboard.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: false }),
    TypeOrmModule.forRoot({
      url: process.env.DATABASE_PUBLIC_URL,
      type: 'postgres',
      host: process.env.PGHOST,
      port: parseInt(process.env.PGPORT ?? '5432', 10),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: [User, Product, Sale, SaleItem],
      synchronize: true,
    }),
    AuthModule,
    UserModule,
    ProductModule,
    SaleModule,
    DashboardModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
