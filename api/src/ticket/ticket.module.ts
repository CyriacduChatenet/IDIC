import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { TicketService } from './ticket.service';
import { TicketController } from './ticket.controller';
import { StrapiService } from '../strapi/strapi.service';

@Module({
  imports: [HttpModule],
  controllers: [TicketController],
  providers: [TicketService, StrapiService],
  exports: [TicketService],
})
export class TicketModule {}
