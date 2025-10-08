import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PlayerModule } from './player/player.module';
import { ClubModule } from './club/club.module';
import { SponsorModule } from './sponsor/sponsor.module';
import { TicketModule } from './ticket/ticket.module';
import { EventModule } from './event/event.module';
import { CustomerModule } from './customer/customer.module';
import { UserModule } from './user/user.module';
import { MailModule } from './mail/mail.module';
import { StripeModule } from './stripe/stripe.module';
import { AuthModule } from './auth/auth.module';
import { TeamModule } from './team/team.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    HttpModule,
    PlayerModule,
    ClubModule,
    SponsorModule,
    TicketModule,
    EventModule,
    CustomerModule,
    UserModule,
    MailModule,
    StripeModule,
    AuthModule,
    TeamModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
