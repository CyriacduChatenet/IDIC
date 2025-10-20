import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { CreateSponsorDto } from './dto/create-sponsor.dto';
import { UpdateSponsorDto } from './dto/update-sponsor.dto';
import { StrapiService } from '../strapi/strapi.service';
import {
  StrapiApiCreateResponse,
  StrapiApiDeleteResponse,
  StrapiApiFindAllResponse,
  StrapiApiFindOneResponse,
  StrapiApiUpdateResponse,
} from '../config/interfaces/strapi-api-response.interface';
import { Sponsor } from './entities/sponsor.entity';

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
      console.error('Error creating sponsor:', err);
      throw new ForbiddenException(
        `You do not have PERMISSION to create a STRAPI_SPONSOR`,
      );
    }
  }

  findAll(): Promise<StrapiApiFindAllResponse<Sponsor>> {
    try {
      return this.strapiService.getAllData('sponsors');
    } catch (err) {
      console.error('Error fetching sponsors:', err);
      throw new NotFoundException(`No STRAPI_SPONSORS found`);
    }
  }

  findOne(id: string): Promise<StrapiApiFindOneResponse<Sponsor>> {
    try {
      return this.strapiService.getDataById(`sponsors/${id}`);
    } catch (err) {
      console.error('Error fetching sponsor:', err);
      throw new NotFoundException(`STRAPI_SPONSOR with ID ${id} not found`);
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
      console.error('Error updating player:', err);
      throw new ForbiddenException(
        `You do not have permission to update STRAPI_SPONSOR with ID ${id} and CRDENTIALS ${JSON.stringify(updateSponsorDto)}`,
      );
    }
  }

  async remove(id: string): Promise<StrapiApiDeleteResponse<Sponsor>> {
    try {
      const sponsor = await this.findOne(id);
      await this.strapiService.deleteData(`sponsors/${id}`);

      return { data: sponsor.data };
    } catch (err) {
      console.error('Error deleting sponsor:', err);
      throw new ForbiddenException(
        `You do not have permission to delete STRAPI_SPONSOR with ID ${id}`,
      );
    }
  }
}
