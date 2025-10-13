import { InitStripe } from './init.stripe';

export class CustomerStripe {
  private stripe: InitStripe;

  constructor() {
    this.stripe = new InitStripe();
  }

  public createCustomer(email: string, name: string) {
    const stripeInstance = this.stripe.getStripeInstance();
    return stripeInstance.customers.create({
      email,
      name,
    });
  }

  public retrieveCustomer(customerId: string) {
    const stripeInstance = this.stripe.getStripeInstance();
    return stripeInstance.customers.retrieve(customerId);
  }

  public updateCustomer(
    customerId: string,
    updates: { email?: string; name?: string; stripe_customer_id?: string },
  ) {
    const stripeInstance = this.stripe.getStripeInstance();
    return stripeInstance.customers.update(customerId, updates);
  }

  public deleteCustomer(customerId: string) {
    const stripeInstance = this.stripe.getStripeInstance();
    return stripeInstance.customers.del(customerId);
  }

  public listCustomers(limit: number = 10) {
    const stripeInstance = this.stripe.getStripeInstance();
    return stripeInstance.customers.list({ limit });
  }
}
