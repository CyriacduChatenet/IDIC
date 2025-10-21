import { Injectable } from '@nestjs/common';

import { CreateClubDto } from './dto/create-club.dto';
import { UpdateClubDto } from './dto/update-club.dto';
import { StrapiService } from '../strapi/strapi.service';
import { Club } from './entities/club.entity';
import {
  StrapiApiCreateResponse,
  StrapiApiDeleteResponse,
  StrapiApiFindAllResponse,
  StrapiApiFindOneResponse,
  StrapiApiUpdateResponse,
} from '../strapi/interfaces/strapi-api-response.interface';
import { handleAxiosError } from '../config/utils/axios-error.utils';

@Injectable()
export class ClubService {
  constructor(private readonly strapiService: StrapiService) {}

  create(createClubDto: CreateClubDto): Promise<StrapiApiCreateResponse<Club>> {
    try {
      return this.strapiService.postData('clubs', {
        data: createClubDto,
      });
    } catch (err) {
      handleAxiosError(err, 'creating club');
    }
  }

  findAll(): Promise<StrapiApiFindAllResponse<Club>> {
    try {
      return this.strapiService.getAllData('clubs', '*');
    } catch (err) {
      handleAxiosError(err, 'fetching clubs');
    }
  }

  findOne(id: string): Promise<StrapiApiFindOneResponse<Club>> {
    try {
      return this.strapiService.getDataById(`clubs/${id}`, '*');
    } catch (err) {
      handleAxiosError(err, `fetching club with ID ${id}`);
    }
  }

  update(
    id: string,
    updateClubDto: UpdateClubDto,
  ): Promise<StrapiApiUpdateResponse<Club>> {
    try {
      return this.strapiService.updateData(`clubs/${id}`, {
        data: updateClubDto,
      });
    } catch (err) {
      handleAxiosError(err, `updating club with ID ${id}`);
    }
  }

  async remove(id: string): Promise<StrapiApiDeleteResponse<Club>> {
    try {
      const club = await this.findOne(id);
      await this.strapiService.deleteData(`clubs/${id}`);
      return { data: club.data };
    } catch (err) {
      handleAxiosError(err, `deleting club with ID ${id}`);
    }
  }
}
