import { Type } from 'class-transformer';
import {
  IsArray,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsUUID,
  ValidateNested,
} from 'class-validator';

export class CreateSaleDto {
  @IsDateString()
  @IsNotEmpty()
  datetime: string;

  @IsArray()
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CartItem)
  detail: CartItem[];
}

class CartItem {
  @IsNumber()
  @IsNotEmpty()
  quantity: number;

  @IsNotEmpty()
  @IsUUID()
  product_uuid: string;
}
