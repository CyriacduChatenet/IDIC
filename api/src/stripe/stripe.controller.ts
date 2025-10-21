import { BadRequestException, Controller, Get } from '@nestjs/common';

import { CustomerStripeService } from './services/customer-stripe.service';

@Controller('stripe')
export class StripeController {
  constructor(private readonly customerStripeService: CustomerStripeService) {}

  @Get('customer')
  listCustomers() {
    try {
      return this.customerStripeService.listCustomers();
    } catch (error) {
      console.error('Error fetching Stripe customers:', error);
      throw new BadRequestException('Failed to fetch Stripe customers');
    }
  }
}
