import { Module } from '@nestjs/common';

import { IntentStripeService } from './services/intent-stripe.service';
import { CustomerStripeService } from './services/customer-stripe.service';
import { CustomerController } from './controllers/customer/customer.controller';
import { IntentController } from './controllers/intent/intent.controller';
import { InvoiceController } from './controllers/invoice/invoice.controller';
import { PriceController } from './controllers/price/price.controller';
import { ProductController } from './controllers/product/product.controller';
import { SubscriptionController } from './controllers/subscription/subscription.controller';
import { InvoiceStripeService } from './services/invoice-stripe.service';
import { PriceStripeService } from './services/price-stripe.service';
import { ProductStripeService } from './services/product-stripe.service';
import { SubscriptionStripeService } from './services/subscription-stripe.service';
import { StripeWebhookController } from './controllers/webhook/webhook.controller';
import { InitStripeService } from './services/init-stripe.service';

@Module({
  controllers: [
    CustomerController,
    IntentController,
    InvoiceController,
    PriceController,
    ProductController,
    SubscriptionController,
    StripeWebhookController,
  ],
  providers: [
    InitStripeService,
    IntentStripeService,
    CustomerStripeService,
    InvoiceStripeService,
    PriceStripeService,
    ProductStripeService,
    SubscriptionStripeService,
  ],
  exports: [CustomerStripeService],
})
export class StripeModule {}
