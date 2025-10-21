import { Module } from '@nestjs/common';

import { StripeService } from './stripe.service';
import { StripeController } from './stripe.controller';
import { IntentStripe } from './services/intent-stripe.service';
import { CustomerStripe } from './services/customer-stripe.service';

@Module({
  providers: [StripeService, IntentStripe, CustomerStripe],
  controllers: [StripeController],
  exports: [StripeService, CustomerStripe],
})
export class StripeModule {}
