import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { SponsorService } from './sponsor.service';
import { SponsorController } from './sponsor.controller';
import { StrapiService } from '../strapi/strapi.service';

@Module({
  imports: [HttpModule],
  controllers: [SponsorController],
  providers: [SponsorService, StrapiService],
  exports: [SponsorService],
})
export class SponsorModule {}
