import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { TeamService } from './team.service';
import { TeamController } from './team.controller';
import { StrapiService } from '../strapi/strapi.service';

@Module({
  imports: [HttpModule],
  controllers: [TeamController],
  providers: [TeamService, StrapiService],
})
export class TeamModule {}
