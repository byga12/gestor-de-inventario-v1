import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto, UpdateProductDto } from '@by/types';
import { AuthGuard } from '../auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  async addProduct(@Body() createProductDto: CreateProductDto) {
    return await this.productService.addProduct(createProductDto);
  }

  @Get()
  async getProducts() {
    return await this.productService.getProducts();
  }

  @Get(':id')
  async getProductById(@Param('id') id: string) {
    return await this.productService.getProductById(id);
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe())
  async updateProductById(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return await this.productService.updateProductById(id, updateProductDto);
  }

  @Delete(':id')
  async deleteProductById(@Param('id') id: string) {
    return await this.productService.deleteProductById(id);
  }
}
