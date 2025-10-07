import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { HttpModule } from '@nestjs/axios';
import { StrapiService } from '../strapi/strapi.service';

@Module({
  imports: [HttpModule],
  controllers: [EventController],
  providers: [EventService, StrapiService],
})
export class EventModule {}
