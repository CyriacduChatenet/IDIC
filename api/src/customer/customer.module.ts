import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { StrapiService } from '../strapi/strapi.service';

@Module({
  imports: [HttpModule],
  controllers: [CustomerController],
  providers: [CustomerService, StrapiService],
})
export class CustomerModule {}
