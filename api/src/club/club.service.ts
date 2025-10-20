import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

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
} from '../config/interfaces/strapi-api-response.interface';

@Injectable()
export class ClubService {
  constructor(private readonly strapiService: StrapiService) {}

  create(createClubDto: CreateClubDto): Promise<StrapiApiCreateResponse<Club>> {
    try {
      return this.strapiService.postData('clubs', {
        data: createClubDto,
      });
    } catch (err) {
      console.error('Error creating club:', err);
      throw new ForbiddenException(
        `You do not have PERMISSION to create a STRAPI_CLUB`,
      );
    }
  }

  findAll(): Promise<StrapiApiFindAllResponse<Club>> {
    try {
      return this.strapiService.getAllData('clubs', '*');
    } catch (err) {
      console.error('Error fetching clubs:', err);
      throw new NotFoundException(`No STRAPI_CLUBS found`);
    }
  }

  findOne(id: string): Promise<StrapiApiFindOneResponse<Club>> {
    try {
      return this.strapiService.getDataById(`clubs/${id}`, '*');
    } catch (err) {
      console.error('Error fetching club:', err);
      throw new NotFoundException(`STRAPI_CLUB with ID ${id} not found`);
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
      console.error('Error updating club:', err);
      throw new ForbiddenException(
        `You do not have permission to update STRAPI_CLUB with ID ${id} and CRDENTIALS ${JSON.stringify(updateClubDto)}`,
      );
    }
  }

  async remove(id: string): Promise<StrapiApiDeleteResponse<Club>> {
    try {
      const club = await this.findOne(id);
      await this.strapiService.deleteData(`clubs/${id}`);
      return { data: club.data };
    } catch (err) {
      console.error('Error deleting club:', err);
      throw new ForbiddenException(
        `You do not have permission to delete STRAPI_CLUB with ID ${id}`,
      );
    }
  }
}
