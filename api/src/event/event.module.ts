import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { EventService } from './event.service';
import { EventController } from './event.controller';
import { StrapiService } from '../strapi/strapi.service';
import { ClubModule } from '../club/club.module';

@Module({
  imports: [HttpModule, ClubModule],
  controllers: [EventController],
  providers: [EventService, StrapiService],
  exports: [EventService],
})
export class EventModule {}
