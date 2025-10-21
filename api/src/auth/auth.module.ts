import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { StrapiService } from '../strapi/strapi.service';
import { CustomerStripe } from '../stripe/services/customer-stripe.service';

@Module({
  imports: [HttpModule],
  controllers: [AuthController],
  providers: [AuthService, StrapiService, CustomerStripe],
})
export class AuthModule {}
