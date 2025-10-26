/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/require-await */
import { Controller, Post, Req, Headers, HttpCode } from '@nestjs/common';
import express from 'express';
import { InitStripeService } from '../../services/init-stripe.service';

@Controller('stripe')
export class StripeWebhookController {
  constructor(private readonly initStripe: InitStripeService) {}

  @Post('webhook')
  @HttpCode(200)
  async handleWebhook(
    @Req() req: express.Request,
    @Headers('stripe-signature') signature: string,
  ) {
    const stripe = this.initStripe.getStripeInstance();
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET as string;
    let event;

    try {
      event = stripe.webhooks.constructEvent(
        req.body as Buffer,
        signature,
        webhookSecret,
      );
    } catch (err: any) {
      console.error('Webhook signature verification failed.', err.message);
      return { received: false };
    }

    // Handle relevant events
    switch (event.type) {
      case 'payment_intent.succeeded':
        // handle success
        break;
      case 'invoice.paid':
        // handle subscription payment success
        break;
      case 'customer.subscription.deleted':
        // handle cancel
        break;
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    return { received: true };
  }
}
