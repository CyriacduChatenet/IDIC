import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { StripeModule } from './stripe/stripe.module';
import { PlayerModule } from './player/player.module';
import { ClubModule } from './club/club.module';
import { SponsorModule } from './sponsor/sponsor.module';
import { EventModule } from './event/event.module';
import { TicketModule } from './ticket/ticket.module';
import { TeamModule } from './team/team.module';
import { AuthModule } from './auth/auth.module';
import { StrapiModule } from './strapi/strapi.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    HttpModule,
    UserModule,
    StripeModule,
    PlayerModule,
    ClubModule,
    SponsorModule,
    EventModule,
    TicketModule,
    TeamModule,
    AuthModule,
    StrapiModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
