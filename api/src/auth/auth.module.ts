import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { StrapiService } from '../strapi/strapi.service';
import { CustomerStripe } from '../stripe/services/customer-stripe.service';
import { StrapiApiRequestRepository } from '../strapi/interfaces/strapi-api-request.interface';

@Module({
  imports: [HttpModule],
  controllers: [AuthController],
  providers: [
    AuthService,
    StrapiService,
    CustomerStripe,
    StrapiApiRequestRepository,
  ],
})
export class AuthModule {}
