import { Injectable } from '@nestjs/common';

import { CreateSponsorDto } from './dto/create-sponsor.dto';
import { UpdateSponsorDto } from './dto/update-sponsor.dto';
import { StrapiService } from '../strapi/strapi.service';
import {
  StrapiApiCreateResponse,
  StrapiApiDeleteResponse,
  StrapiApiFindAllResponse,
  StrapiApiFindOneResponse,
  StrapiApiUpdateResponse,
} from '../strapi/interfaces/strapi-api-response.interface';
import { Sponsor } from './entities/sponsor.entity';
import { handleAxiosError } from '../config/utils/axios-error.util';

@Injectable()
export class SponsorService {
  constructor(private readonly strapiService: StrapiService) {}

  create(
    createSponsorDto: CreateSponsorDto,
  ): Promise<StrapiApiCreateResponse<Sponsor>> {
    try {
      return this.strapiService.postData('sponsors', {
        data: createSponsorDto,
      });
    } catch (err) {
      handleAxiosError(err, 'creating sponsor');
    }
  }

  findAll(): Promise<StrapiApiFindAllResponse<Sponsor>> {
    try {
      return this.strapiService.getAllData('sponsors');
    } catch (err) {
      handleAxiosError(err, 'fetching sponsors');
    }
  }

  findOne(id: string): Promise<StrapiApiFindOneResponse<Sponsor>> {
    try {
      return this.strapiService.getDataById(`sponsors/${id}`);
    } catch (err) {
      handleAxiosError(err, `fetching sponsor with ID ${id}`);
    }
  }

  update(
    id: string,
    updateSponsorDto: UpdateSponsorDto,
  ): Promise<StrapiApiUpdateResponse<Sponsor>> {
    try {
      return this.strapiService.updateData(`sponsors/${id}`, {
        data: updateSponsorDto,
      });
    } catch (err) {
      handleAxiosError(err, `updating sponsor with ID ${id}`);
    }
  }

  async remove(id: string): Promise<StrapiApiDeleteResponse<Sponsor>> {
    try {
      const sponsor = await this.findOne(id);
      await this.strapiService.deleteData(`sponsors/${id}`);

      return { data: sponsor.data };
    } catch (err) {
      handleAxiosError(err, `deleting sponsor with ID ${id}`);
    }
  }
}
