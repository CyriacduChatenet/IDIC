import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { CreateStripePriceDto } from '../../dto/price/create-price.dto';
import { PriceStripeService } from '../../services/price-stripe.service';
import { UpdateStripePriceDto } from 'src/stripe/dto/price/update-price.dto';

@Controller('stripe/price')
export class PriceController {
  constructor(private readonly priceStripeService: PriceStripeService) {}

  @Post()
  create(@Body() createStripePriceDto: CreateStripePriceDto) {
    return this.priceStripeService.createPrice(createStripePriceDto);
  }

  @Get()
  findAll() {
    return this.priceStripeService.listAllPrices();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.priceStripeService.retrievePrice(id);
  }

  @Get('product/:id')
  findAllByProduct(@Param('productId') productId: string) {
    return this.priceStripeService.listPrices(productId);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateStripePriceDto: UpdateStripePriceDto,
  ) {
    return this.priceStripeService.updatePrice(id, updateStripePriceDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.priceStripeService.deletePrice(id);
  }

  @Post('activate/:id')
  activate(@Param('id') id: string) {
    return this.priceStripeService.activatePrice(id);
  }

  @Post('deactivate/:id')
  deactivate(@Param('id') id: string) {
    return this.priceStripeService.deactivatePrice(id);
  }
}
