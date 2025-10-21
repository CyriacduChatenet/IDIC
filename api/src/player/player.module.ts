import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { PlayerService } from './player.service';
import { PlayerController } from './player.controller';
import { StrapiService } from '../strapi/strapi.service';
import { StrapiApiRequestRepository } from '../strapi/interfaces/strapi-api-request.interface';

@Module({
  imports: [HttpModule],
  controllers: [PlayerController],
  providers: [PlayerService, StrapiService, StrapiApiRequestRepository],
  exports: [PlayerService],
})
export class PlayerModule {}
