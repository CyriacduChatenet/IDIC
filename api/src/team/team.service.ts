import { Injectable } from '@nestjs/common';

import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import {
  StrapiApiCreateResponse,
  StrapiApiDeleteResponse,
  StrapiApiFindAllResponse,
  StrapiApiFindOneResponse,
  StrapiApiUpdateResponse,
} from '../strapi/interfaces/strapi-api-response.interface';
import { Team } from './entities/team.entity';
import { StrapiService } from '../strapi/strapi.service';
import { handleAxiosError } from '../config/utils/axios-error.util';

@Injectable()
export class TeamService {
  constructor(private readonly strapiService: StrapiService) {}

  create(createTeamDto: CreateTeamDto): Promise<StrapiApiCreateResponse<Team>> {
    try {
      return this.strapiService.postData('teams', {
        data: createTeamDto,
      });
    } catch (err) {
      handleAxiosError(err, 'creating team');
    }
  }

  findAll(): Promise<StrapiApiFindAllResponse<Team>> {
    try {
      return this.strapiService.getAllData('teams');
    } catch (err) {
      handleAxiosError(err, 'fetching teams');
    }
  }

  findOne(id: string): Promise<StrapiApiFindOneResponse<Team>> {
    try {
      return this.strapiService.getDataById(`teams/${id}`);
    } catch (err) {
      handleAxiosError(err, `fetching team with ID ${id}`);
    }
  }

  update(
    id: string,
    updateTeamDto: UpdateTeamDto,
  ): Promise<StrapiApiUpdateResponse<Team>> {
    try {
      return this.strapiService.updateData(`teams/${id}`, {
        data: updateTeamDto,
      });
    } catch (err) {
      handleAxiosError(err, `updating team with ID ${id}`);
    }
  }

  async remove(id: string): Promise<StrapiApiDeleteResponse<Team>> {
    try {
      const team = await this.findOne(id);
      await this.strapiService.deleteData(`teams/${id}`);

      return { data: team.data };
    } catch (err) {
      handleAxiosError(err, `deleting team with ID ${id}`);
    }
  }
}
