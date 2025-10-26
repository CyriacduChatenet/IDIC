/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Stripe } from 'stripe';
import { InitStripeService } from './init-stripe.service';
import { CreateStripeSubscriptionDto } from '../dto/subscription/create-subscription.dto';
import { UpdateStripetSubscriptionDto } from '../dto/subscription/update-subscription.dto';

@Injectable()
export class SubscriptionStripeService {
  private stripe: InitStripeService;

  constructor() {
    this.stripe = new InitStripeService();
  }

  /**
   * Create a new subscription for a customer.
   * @param customerId Stripe customer ID
   * @param priceId Stripe price ID (from your product)
   * @param trialDays Optional number of free trial days
   */
  public async createSubscription(
    createStripeSubscriptionDto: CreateStripeSubscriptionDto,
  ): Promise<Stripe.Subscription> {
    try {
      return await this.stripe.getStripeInstance().subscriptions.create({
        ...createStripeSubscriptionDto,
        expand: ['latest_invoice.payment_intent', 'customer'],
      });
    } catch (error: any) {
      console.error('❌ Error creating Stripe subscription:', error.message);
      throw new BadRequestException(
        `Failed to create subscription for customer ${createStripeSubscriptionDto.customer}: ${error.message}`,
      );
    }
  }

  /**
   * Retrieve a subscription by ID.
   * @param subscriptionId Stripe subscription ID
   */
  public async retrieveSubscription(
    subscriptionId: string,
  ): Promise<Stripe.Subscription> {
    try {
      return await this.stripe
        .getStripeInstance()
        .subscriptions.retrieve(subscriptionId);
    } catch (error: any) {
      console.error('❌ Error retrieving subscription:', error.message);
      throw new BadRequestException(
        `Failed to retrieve subscription with ID ${subscriptionId}: ${error.message}`,
      );
    }
  }

  /**
   * Update a subscription (e.g. change price or cancel at end).
   * @param subscriptionId Stripe subscription ID
   * @param updates Partial fields to update
   */
  public async updateSubscription(
    subscriptionId: string,
    updateStripeSubscriptionDto: UpdateStripetSubscriptionDto,
  ): Promise<Stripe.Subscription> {
    try {
      return await this.stripe
        .getStripeInstance()
        .subscriptions.update(subscriptionId, updateStripeSubscriptionDto);
    } catch (error: any) {
      console.error('❌ Error updating subscription:', error.message);
      throw new BadRequestException(
        `Failed to update subscription ${subscriptionId}: ${error.message}`,
      );
    }
  }

  /**
   * Cancel a subscription (immediately or at end of billing period).
   * @param subscriptionId Stripe subscription ID
   * @param atPeriodEnd If true, cancels at the end of billing period
   */
  public async cancelSubscription(
    subscriptionId: string,
    atPeriodEnd = true,
  ): Promise<Stripe.Subscription> {
    try {
      return await this.stripe
        .getStripeInstance()
        .subscriptions.update(subscriptionId, {
          cancel_at_period_end: atPeriodEnd,
        });
    } catch (error: any) {
      console.error('❌ Error canceling subscription:', error.message);
      throw new BadRequestException(
        `Failed to cancel subscription ${subscriptionId}: ${error.message}`,
      );
    }
  }

  /**
   * List subscriptions (paginated).
   * @param limit Number of subscriptions to fetch
   * @param customerId Optional customer filter
   */
  public async listSubscriptions(
    limit = 10,
    customerId?: string,
  ): Promise<Stripe.ApiList<Stripe.Subscription>> {
    try {
      const params: Stripe.SubscriptionListParams = { limit };
      if (customerId) params.customer = customerId;
      return await this.stripe.getStripeInstance().subscriptions.list(params);
    } catch (error: any) {
      console.error('❌ Error listing subscriptions:', error.message);
      throw new InternalServerErrorException(
        `Failed to list subscriptions: ${error.message}`,
      );
    }
  }

  /**
   * Retrieve all subscriptions (handle pagination).
   */
  public async listAllSubscriptions(): Promise<Stripe.Subscription[]> {
    try {
      const subscriptions: Stripe.Subscription[] = [];
      let hasMore = true;
      let startingAfter: string | undefined = undefined;

      while (hasMore) {
        const response = await this.stripe
          .getStripeInstance()
          .subscriptions.list({
            limit: 100,
            starting_after: startingAfter,
          });

        subscriptions.push(...response.data);
        hasMore = response.has_more;

        if (hasMore && response.data.length > 0) {
          startingAfter = response.data[response.data.length - 1].id;
        }
      }

      return subscriptions;
    } catch (error: any) {
      console.error('❌ Error listing all subscriptions:', error.message);
      throw new InternalServerErrorException(
        `Failed to list all subscriptions: ${error.message}`,
      );
    }
  }
}
