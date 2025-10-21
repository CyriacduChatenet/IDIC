import { Injectable } from '@nestjs/common';

import { IntentStripe } from './services/intent-stripe.service';

@Injectable()
export class StripeService {
  constructor(private readonly intentStripe: IntentStripe) {}

  createPaymentIntent(amount: number, currency: string) {
    return this.intentStripe.createPaymentIntent(amount, currency);
  }
}
