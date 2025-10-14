import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MailModule } from './mail/mail.module';
import { StripeModule } from './stripe/stripe.module';
import { AuthModule } from './auth/auth.module';
import { PlayerModule } from './player/player.module';
import { ClubModule } from './club/club.module';
import { SponsorModule } from './sponsor/sponsor.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    HttpModule,
    UserModule,
    MailModule,
    StripeModule,
    AuthModule,
    PlayerModule,
    ClubModule,
    SponsorModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
