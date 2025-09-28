import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  ValidationPipe,
  UsePipes,
} from '@nestjs/common';
import { SaleService } from './sale.service';
import { CreateSaleDto } from './dto/create-sale.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('sale')
@UseGuards(AuthGuard)
export class SaleController {
  constructor(private readonly saleService: SaleService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  async create(@Body() createSaleDto: CreateSaleDto) {
    return await this.saleService.create(createSaleDto);
  }

  @Get()
  async findAll() {
    return await this.saleService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.saleService.findOne(id);
  }

  // @Patch(':id')
  // @UsePipes(new ValidationPipe())
  // update(@Param('id') id: string, @Body() updateSaleDto: UpdateSaleDto) {
  //   return this.saleService.update(+id, updateSaleDto);
  // }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.saleService.remove(id);
  }
}
