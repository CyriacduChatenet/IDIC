import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { CustomerStripeService } from '../../services/customer-stripe.service';
import { CreateStripeCustomerDto } from '../../dto/customer/create-customer.dto';
import { UpdateStripeCustomerDto } from '../../dto/customer/update-customer.dto';

@Controller('stripe/customer')
export class CustomerController {
  constructor(private readonly customerStripeService: CustomerStripeService) {}

  @Post()
  create(@Body() createStripeCustomerDto: CreateStripeCustomerDto) {
    return this.customerStripeService.createCustomer(createStripeCustomerDto);
  }

  @Get()
  findAll() {
    return this.customerStripeService.listCustomers();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.customerStripeService.retrieveCustomer(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateStripeCustomerDto: UpdateStripeCustomerDto,
  ) {
    return this.customerStripeService.updateCustomer(
      id,
      updateStripeCustomerDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.customerStripeService.deleteCustomer(id);
  }
}
