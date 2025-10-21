import { InitStripeService } from './init-stripe.service';

export class IntentStripeService {
  private stripe: InitStripeService;

  constructor() {
    this.stripe = new InitStripeService();
  }

  public createPaymentIntent(
    amount: number,
    currency: string,
    customerId?: string,
  ) {
    const stripeInstance = this.stripe.getStripeInstance();
    return stripeInstance.paymentIntents.create({
      amount,
      currency,
      customer: customerId,
    });
  }

  public retrievePaymentIntent(paymentIntentId: string) {
    const stripeInstance = this.stripe.getStripeInstance();
    return stripeInstance.paymentIntents.retrieve(paymentIntentId);
  }

  public updatePaymentIntent(
    paymentIntentId: string,
    updates: { amount?: number; currency?: string },
  ) {
    const stripeInstance = this.stripe.getStripeInstance();
    return stripeInstance.paymentIntents.update(paymentIntentId, updates);
  }

  public confirmPaymentIntent(paymentIntentId: string) {
    const stripeInstance = this.stripe.getStripeInstance();
    return stripeInstance.paymentIntents.confirm(paymentIntentId);
  }

  public cancelPaymentIntent(paymentIntentId: string) {
    const stripeInstance = this.stripe.getStripeInstance();
    return stripeInstance.paymentIntents.cancel(paymentIntentId);
  }
}
