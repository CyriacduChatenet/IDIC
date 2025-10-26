import { CreateIntentDto } from '../dto/intent/create-intent.dto';
import { UpdateIntentDto } from '../dto/intent/update-intent.dto';
import { InitStripeService } from './init-stripe.service';

export class IntentStripeService {
  private stripe: InitStripeService;

  constructor() {
    this.stripe = new InitStripeService();
  }

  public createPaymentIntent(createIntentDto: CreateIntentDto) {
    const stripeInstance = this.stripe.getStripeInstance();
    return stripeInstance.paymentIntents.create(createIntentDto);
  }

  public retrievePaymentIntent(paymentIntentId: string) {
    const stripeInstance = this.stripe.getStripeInstance();
    return stripeInstance.paymentIntents.retrieve(paymentIntentId);
  }

  public updatePaymentIntent(
    paymentIntentId: string,
    updateIntentDto: UpdateIntentDto,
  ) {
    const stripeInstance = this.stripe.getStripeInstance();
    return stripeInstance.paymentIntents.update(
      paymentIntentId,
      updateIntentDto,
    );
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
