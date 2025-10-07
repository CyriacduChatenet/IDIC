import { Module } from '@nestjs/common';
import { ClubService } from './club.service';
import { ClubController } from './club.controller';
import { HttpModule } from '@nestjs/axios';
import { StrapiService } from '../strapi/strapi.service';

@Module({
  imports: [HttpModule],
  controllers: [ClubController],
  providers: [ClubService, StrapiService],
})
export class ClubModule {}
