import Stripe from 'stripe';

export class InitStripeService {
  private stripe: Stripe;

  constructor() {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: '2025-09-30.clover',
    });
  }

  public getStripeInstance(): Stripe {
    return this.stripe;
  }
}
