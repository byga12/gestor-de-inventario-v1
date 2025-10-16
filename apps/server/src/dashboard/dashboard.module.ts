import { Module } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';
import { ProductModule } from 'src/product/product.module';
import { UserModule } from 'src/user/user.module';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [DashboardService, JwtService],
  controllers: [DashboardController],
  imports: [ProductModule, UserModule],
})
export class DashboardModule {}

