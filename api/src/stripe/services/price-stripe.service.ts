import { InitStripeService } from './init-stripe.service';

export class PriceStripeService {
  private stripe: InitStripeService;

  constructor() {
    this.stripe = new InitStripeService();
  }

  public createPrice = async (
    productId: string,
    unitAmount: number,
    currency: string,
  ) => {
    return await this.stripe.getStripeInstance().prices.create({
      product: productId,
      unit_amount: unitAmount,
      currency: currency,
    });
  };

  public retrievePrice = async (priceId: string) => {
    return await this.stripe.getStripeInstance().prices.retrieve(priceId);
  };

  public listPrices = async (productId: string) => {
    return await this.stripe.getStripeInstance().prices.list({
      product: productId,
      limit: 100,
    });
  };

  public updatePrice = async (
    priceId: string,
    metadata: Record<string, string>,
  ) => {
    return await this.stripe.getStripeInstance().prices.update(priceId, {
      metadata: metadata,
    });
  };

  public deletePrice = async (priceId: string) => {
    // Stripe does not support deleting prices, so we can only archive them
    return await this.stripe.getStripeInstance().prices.update(priceId, {
      active: false,
    });
  };

  public activatePrice = async (priceId: string) => {
    return await this.stripe.getStripeInstance().prices.update(priceId, {
      active: true,
    });
  };

  public deactivatePrice = async (priceId: string) => {
    return await this.stripe.getStripeInstance().prices.update(priceId, {
      active: false,
    });
  };

  public listAllPrices = async () => {
    return await this.stripe.getStripeInstance().prices.list({
      limit: 100,
    });
  };
}
