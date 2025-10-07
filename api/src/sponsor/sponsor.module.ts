import { Module } from '@nestjs/common';
import { SponsorService } from './sponsor.service';
import { SponsorController } from './sponsor.controller';
import { HttpModule } from '@nestjs/axios';
import { StrapiService } from '../strapi/strapi.service';

@Module({
  imports: [HttpModule],
  controllers: [SponsorController],
  providers: [SponsorService, StrapiService],
})
export class SponsorModule {}
