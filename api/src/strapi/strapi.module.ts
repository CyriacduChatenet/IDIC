import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

import { StrapiApiRequestRepository } from './interfaces/strapi-api-request.interface';
import { StrapiService } from './strapi.service';

@Module({
  imports: [HttpModule],
  providers: [StrapiApiRequestRepository, StrapiService],
  exports: [StrapiService],
})
export class StrapiModule {}
