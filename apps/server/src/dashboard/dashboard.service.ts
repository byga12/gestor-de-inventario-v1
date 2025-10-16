import { Injectable } from '@nestjs/common';
import { ProductService } from 'src/product/product.service';
import { UserService } from '../user/user.service';

@Injectable()
export class DashboardService {
  constructor(
    private readonly usersService: UserService,
    private readonly productsService: ProductService,
  ) {}

  async getDashboardData() {
    const [activeUserCount, userCount, productCount] = await Promise.all([
      this.usersService.countActive(),
      this.usersService.countAll(),
      this.productsService.countAll(),
    ]);

    return {
      activeUsers: activeUserCount,
      totalUsers: userCount,
      totalProducts: productCount,
    };
  }
}
