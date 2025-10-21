import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { SponsorService } from './sponsor.service';
import { SponsorController } from './sponsor.controller';
import { StrapiService } from '../strapi/strapi.service';
import { StrapiApiRequestRepository } from '../strapi/interfaces/strapi-api-request.interface';

@Module({
  imports: [HttpModule],
  controllers: [SponsorController],
  providers: [SponsorService, StrapiService, StrapiApiRequestRepository],
  exports: [SponsorService],
})
export class SponsorModule {}
