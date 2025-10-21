import { handleStripeError } from '../utils/stripe-error.util';
import { InitStripe } from './init-stripe.service';

export class CustomerStripe {
  private stripe: InitStripe;

  constructor() {
    this.stripe = new InitStripe();
  }

  // 🔹 Créer un client
  async createCustomer(email: string, name: string) {
    try {
      const stripeInstance = this.stripe.getStripeInstance();
      return await stripeInstance.customers.create({ email, name });
    } catch (err) {
      handleStripeError(err, 'creating customer');
    }
  }

  // 🔹 Récupérer un client
  async retrieveCustomer(customerId: string) {
    try {
      const stripeInstance = this.stripe.getStripeInstance();
      return await stripeInstance.customers.retrieve(customerId);
    } catch (err) {
      handleStripeError(err, `retrieving customer ${customerId}`);
    }
  }

  // 🔹 Mettre à jour un client
  async updateCustomer(
    customerId: string,
    updates: { email?: string; name?: string; stripe_customer_id?: string },
  ) {
    try {
      const stripeInstance = this.stripe.getStripeInstance();
      return await stripeInstance.customers.update(customerId, updates);
    } catch (err) {
      handleStripeError(err, `updating customer ${customerId}`);
    }
  }

  // 🔹 Supprimer un client
  async deleteCustomer(customerId: string) {
    try {
      const stripeInstance = this.stripe.getStripeInstance();
      return await stripeInstance.customers.del(customerId);
    } catch (err) {
      handleStripeError(err, `deleting customer ${customerId}`);
    }
  }

  // 🔹 Lister les clients
  async listCustomers(limit: number = 10) {
    try {
      const stripeInstance = this.stripe.getStripeInstance();
      return await stripeInstance.customers.list({ limit });
    } catch (err) {
      handleStripeError(err, 'listing customers');
    }
  }
}
