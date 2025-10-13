import { Module } from '@nestjs/common';

import { StripeService } from './stripe.service';
import { StripeController } from './stripe.controller';
import { IntentStripe } from './classes/intent.stripe';
import { CustomerStripe } from './classes/customer.stripe';

@Module({
  providers: [StripeService, IntentStripe, CustomerStripe],
  controllers: [StripeController],
  exports: [StripeService, CustomerStripe],
})
export class StripeModule {}
