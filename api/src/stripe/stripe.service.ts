import { Injectable } from '@nestjs/common';

import { IntentStripe } from './classes/intent.stripe';

@Injectable()
export class StripeService {
  constructor(private readonly intentStripe: IntentStripe) {}

  createPaymentIntent(amount: number, currency: string) {
    return this.intentStripe.createPaymentIntent(amount, currency);
  }
}
