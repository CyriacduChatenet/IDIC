import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { StrapiService } from '../strapi/strapi.service';
import { CustomerStripeService } from '../stripe/services/customer-stripe.service';
import { StrapiApiRequestRepository } from '../strapi/interfaces/strapi-api-request.interface';
import { UserService } from '../user/user.service';
import { PlayerService } from '../player/player.service';
import { ClubService } from '../club/club.service';
import { SponsorService } from '../sponsor/sponsor.service';

@Module({
  imports: [HttpModule],
  controllers: [AuthController],
  providers: [
    AuthService,
    StrapiService,
    CustomerStripeService,
    StrapiApiRequestRepository,
    UserService,
    PlayerService,
    ClubService,
    SponsorService,
  ],
})
export class AuthModule {}
