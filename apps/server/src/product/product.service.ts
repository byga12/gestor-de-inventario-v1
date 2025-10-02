import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductDto, UpdateProductDto } from '@by/types';
@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async addProduct(createProductDto: CreateProductDto) {
    const { name, description, unit_price } = createProductDto;
    const product = new Product(name, description, unit_price);
    return await this.productRepository.insert(product);
  }

  async getProducts() {
    return await this.productRepository.find({});
  }

  async getProductById(id: string) {
    return await this.productRepository.findOneByOrFail({ id });
  }

  async updateProductById(id: string, updateProductDto: UpdateProductDto) {
    const product: Product = await this.productRepository.findOneByOrFail({
      id,
    });
    return await this.productRepository.update(product, {
      ...updateProductDto,
    });
  }

  async deleteProductById(id: string) {
    const product: Product = await this.productRepository.findOneByOrFail({
      id,
    });
    return await this.productRepository.softRemove(product);
  }
}
