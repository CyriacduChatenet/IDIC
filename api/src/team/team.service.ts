import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import {
  StrapiApiCreateResponse,
  StrapiApiDeleteResponse,
  StrapiApiFindAllResponse,
  StrapiApiFindOneResponse,
  StrapiApiUpdateResponse,
} from '../config/interfaces/strapi-api-response.interface';
import { Team } from './entities/team.entity';
import { StrapiService } from '../strapi/strapi.service';

@Injectable()
export class TeamService {
  constructor(private readonly strapiService: StrapiService) {}

  create(createTeamDto: CreateTeamDto): Promise<StrapiApiCreateResponse<Team>> {
    try {
      return this.strapiService.postData('teams', {
        data: createTeamDto,
      });
    } catch (err) {
      console.error('Error creating team:', err);
      throw new ForbiddenException(
        `You do not have PERMISSION to create a STRAPI_TEAM`,
      );
    }
  }

  findAll(): Promise<StrapiApiFindAllResponse<Team>> {
    try {
      return this.strapiService.getAllData('teams');
    } catch (err) {
      console.error('Error fetching teams:', err);
      throw new NotFoundException(`No STRAPI_TEAMS found`);
    }
  }

  findOne(id: string): Promise<StrapiApiFindOneResponse<Team>> {
    try {
      return this.strapiService.getDataById(`teams/${id}`);
    } catch (err) {
      console.error('Error fetching taem:', err);
      throw new NotFoundException(`STRAPI_TEAM with ID ${id} not found`);
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
      console.error('Error updating team:', err);
      throw new ForbiddenException(
        `You do not have permission to update STRAPI_TEAM with ID ${id} and CRDENTIALS ${JSON.stringify(updateTeamDto)}`,
      );
    }
  }

  async remove(id: string): Promise<StrapiApiDeleteResponse<Team>> {
    try {
      const team = await this.findOne(id);
      await this.strapiService.deleteData(`teams/${id}`);

      return { data: team.data };
    } catch (err) {
      console.error('Error deleting team:', err);
      throw new ForbiddenException(
        `You do not have permission to delete STRAPI_TEAM with ID ${id}`,
      );
    }
  }
}
