import { Module } from '@nestjs/common';

import { StripeService } from './stripe.service';
import { StripeController } from './stripe.controller';
import { IntentStripe } from './classes/intent.stripe';

@Module({
  providers: [StripeService, IntentStripe],
  controllers: [StripeController],
  exports: [StripeService],
})
export class StripeModule {}
