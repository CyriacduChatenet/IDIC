import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { PlayerService } from './player.service';
import { PlayerController } from './player.controller';
import { StrapiService } from '../strapi/strapi.service';

@Module({
  imports: [HttpModule],
  controllers: [PlayerController],
  providers: [PlayerService, StrapiService],
})
export class PlayerModule {}
