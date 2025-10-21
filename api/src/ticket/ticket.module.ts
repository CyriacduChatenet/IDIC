import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { TicketService } from './ticket.service';
import { TicketController } from './ticket.controller';
import { StrapiService } from '../strapi/strapi.service';
import { StrapiApiRequestRepository } from '../strapi/interfaces/strapi-api-request.interface';

@Module({
  imports: [HttpModule],
  controllers: [TicketController],
  providers: [TicketService, StrapiService, StrapiApiRequestRepository],
  exports: [TicketService],
})
export class TicketModule {}
