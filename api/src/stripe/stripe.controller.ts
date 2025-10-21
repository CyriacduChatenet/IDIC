import { BadRequestException, Controller, Get } from '@nestjs/common';

import { CustomerStripe } from './services/customer-stripe.service';

@Controller('stripe')
export class StripeController {
  constructor(private readonly customerStripe: CustomerStripe) {}

  @Get('customer')
  listCustomers() {
    try {
      return this.customerStripe.listCustomers();
    } catch (error) {
      console.error('Error fetching Stripe customers:', error);
      throw new BadRequestException('Failed to fetch Stripe customers');
    }
  }
}
