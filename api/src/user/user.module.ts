import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { UserService } from './user.service';
import { UserController } from './user.controller';
import { StrapiService } from '../strapi/strapi.service';
import { StripeModule } from '../stripe/stripe.module';
import { CustomerStripe } from '../stripe/classes/customer.stripe';
import { PlayerService } from '../player/player.service';
import { ClubService } from '../club/club.service';
import { SponsorService } from '../sponsor/sponsor.service';

@Module({
  imports: [HttpModule, StripeModule],
  controllers: [UserController],
  providers: [
    UserService,
    StrapiService,
    CustomerStripe,
    PlayerService,
    ClubService,
    SponsorService,
  ],
})
export class UserModule {}
