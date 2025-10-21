import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { TeamService } from './team.service';
import { TeamController } from './team.controller';
import { StrapiService } from '../strapi/strapi.service';
import { StrapiApiRequestRepository } from '../strapi/interfaces/strapi-api-request.interface';

@Module({
  imports: [HttpModule],
  controllers: [TeamController],
  providers: [TeamService, StrapiService, StrapiApiRequestRepository],
})
export class TeamModule {}
