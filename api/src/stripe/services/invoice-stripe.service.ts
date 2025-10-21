import { InitStripe } from './init-stripe.service';

export class InvoiceStripe {
  private stripe: InitStripe;

  constructor() {
    this.stripe = new InitStripe();
  }

  public createInvoice(customerId: string, autoAdvance = true) {
    const stripeInstance = this.stripe.getStripeInstance();
    return stripeInstance.invoices.create({
      customer: customerId,
      auto_advance: autoAdvance,
    });
  }

  public retrieveInvoice(invoiceId: string) {
    const stripeInstance = this.stripe.getStripeInstance();
    return stripeInstance.invoices.retrieve(invoiceId);
  }

  public finalizeInvoice(invoiceId: string) {
    const stripeInstance = this.stripe.getStripeInstance();
    return stripeInstance.invoices.finalizeInvoice(invoiceId);
  }

  public payInvoice(invoiceId: string) {
    const stripeInstance = this.stripe.getStripeInstance();
    return stripeInstance.invoices.pay(invoiceId);
  }

  public voidInvoice(invoiceId: string) {
    const stripeInstance = this.stripe.getStripeInstance();
    return stripeInstance.invoices.voidInvoice(invoiceId);
  }

  public listInvoices(customerId?: string, limit = 10) {
    const stripeInstance = this.stripe.getStripeInstance();
    return stripeInstance.invoices.list({
      customer: customerId,
      limit,
    });
  }
}
