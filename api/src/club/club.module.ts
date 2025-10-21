import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { ClubService } from './club.service';
import { ClubController } from './club.controller';
import { StrapiService } from '../strapi/strapi.service';
import { StrapiApiRequestRepository } from '../strapi/interfaces/strapi-api-request.interface';

@Module({
  imports: [HttpModule],
  controllers: [ClubController],
  providers: [ClubService, StrapiService, StrapiApiRequestRepository],
  exports: [ClubService],
})
export class ClubModule {}
