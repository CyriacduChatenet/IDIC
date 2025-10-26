import { CreateStripeInvoiceDto } from '../dto/invoice/create-invoice.dto';
import { InitStripeService } from './init-stripe.service';

export class InvoiceStripeService {
  private stripe: InitStripeService;

  constructor() {
    this.stripe = new InitStripeService();
  }

  public createInvoice(createInvoiceDto: CreateStripeInvoiceDto) {
    const stripeInstance = this.stripe.getStripeInstance();
    return stripeInstance.invoices.create(createInvoiceDto);
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
