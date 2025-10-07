import { Module } from '@nestjs/common';
import { TicketService } from './ticket.service';
import { TicketController } from './ticket.controller';
import { StrapiService } from '../strapi/strapi.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [TicketController],
  providers: [TicketService, StrapiService],
})
export class TicketModule {}
