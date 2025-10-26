import { CreateStripeCustomerDto } from '../dto/customer/create-customer.dto';
import { UpdateStripeCustomerDto } from '../dto/customer/update-customer.dto';
import { handleStripeError } from '../utils/stripe-error.util';
import { InitStripeService } from './init-stripe.service';

export class CustomerStripeService {
  private stripe: InitStripeService;

  constructor() {
    this.stripe = new InitStripeService();
  }

  async createCustomer(createStripeCustomerDto: CreateStripeCustomerDto) {
    try {
      const stripeInstance = this.stripe.getStripeInstance();
      return await stripeInstance.customers.create(createStripeCustomerDto);
    } catch (err) {
      handleStripeError(err, 'creating customer');
    }
  }

  async retrieveCustomer(customerId: string) {
    try {
      const stripeInstance = this.stripe.getStripeInstance();
      return await stripeInstance.customers.retrieve(customerId);
    } catch (err) {
      handleStripeError(err, `retrieving customer ${customerId}`);
    }
  }

  async updateCustomer(
    customerId: string,
    updateStripeCustomerDto: UpdateStripeCustomerDto,
  ) {
    try {
      const stripeInstance = this.stripe.getStripeInstance();
      return await stripeInstance.customers.update(
        customerId,
        updateStripeCustomerDto,
      );
    } catch (err) {
      handleStripeError(err, `updating customer ${customerId}`);
    }
  }

  async deleteCustomer(customerId: string) {
    try {
      const stripeInstance = this.stripe.getStripeInstance();
      return await stripeInstance.customers.del(customerId);
    } catch (err) {
      handleStripeError(err, `deleting customer ${customerId}`);
    }
  }

  async listCustomers(limit: number = 10) {
    try {
      const stripeInstance = this.stripe.getStripeInstance();
      return await stripeInstance.customers.list({ limit });
    } catch (err) {
      handleStripeError(err, 'listing customers');
    }
  }
}
