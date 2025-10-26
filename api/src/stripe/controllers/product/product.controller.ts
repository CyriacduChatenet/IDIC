import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';

import { ProductStripeService } from '../../services/product-stripe.service';
import { CreateStripeProductDto } from '../../dto/product/create-product.dto';
import { UpdateStripeProductDto } from 'src/stripe/dto/product/update-product.dto';

@Controller('stripe/product')
export class ProductController {
  constructor(private readonly productStripeService: ProductStripeService) {}

  @Post()
  create(@Body() createStripeProductDto: CreateStripeProductDto) {
    return this.productStripeService.createProduct(createStripeProductDto);
  }

  @Get()
  findAll() {
    return this.productStripeService.listProducts();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productStripeService.retrieveProduct(id);
  }

  @Get('search')
  findOneBySearch(@Query() search: string) {
    return this.productStripeService.searchProducts(search);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateStripeProductDto: UpdateStripeProductDto,
  ) {
    return this.productStripeService.updateProduct(id, updateStripeProductDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.productStripeService.deleteProduct(id);
  }
}
