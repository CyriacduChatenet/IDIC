import { Injectable } from '@nestjs/common';

import { IntentStripeService } from './services/intent-stripe.service';

@Injectable()
export class StripeService {
  constructor(private readonly intentStripeService: IntentStripeService) {}

  createPaymentIntent(amount: number, currency: string) {
    return this.intentStripeService.createPaymentIntent(amount, currency);
  }
}
