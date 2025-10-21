import { Module } from '@nestjs/common';

import { StripeService } from './stripe.service';
import { StripeController } from './stripe.controller';
import { IntentStripeService } from './services/intent-stripe.service';
import { CustomerStripeService } from './services/customer-stripe.service';

@Module({
  providers: [StripeService, IntentStripeService, CustomerStripeService],
  controllers: [StripeController],
  exports: [StripeService, CustomerStripeService],
})
export class StripeModule {}
