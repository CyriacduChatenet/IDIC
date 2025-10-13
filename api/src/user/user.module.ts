import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { UserService } from './user.service';
import { UserController } from './user.controller';
import { StrapiService } from '../strapi/strapi.service';
import { StripeModule } from '../stripe/stripe.module';
import { CustomerStripe } from '../stripe/classes/customer.stripe';

@Module({
  imports: [HttpModule, StripeModule],
  controllers: [UserController],
  providers: [UserService, StrapiService, CustomerStripe],
})
export class UserModule {}
