import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { StrapiService } from '../strapi/strapi.service';

@Injectable()
export class TeamService {
  constructor(private readonly strapiService: StrapiService) {}

  create(createTeamDto: CreateTeamDto) {
    try {
      return this.strapiService.postData('teams', createTeamDto);
    } catch (error) {
      console.error('Error creating team:', error);
      throw new ForbiddenException(
        'You do not have permission to create a team',
      );
    }
  }

  findAll() {
    try {
      return this.strapiService.getAllData('teams');
    } catch (error) {
      console.error('Error fetching teams:', error);
      throw new NotFoundException('No teams found');
    }
  }

  findOne(id: number) {
    try {
      return this.strapiService.getDataById(`teams`, id);
    } catch (error) {
      console.error('Error fetching team:', error);
      throw new NotFoundException(`Team with ID ${id} not found`);
    }
  }

  update(id: number, updateTeamDto: UpdateTeamDto) {
    try {
      return this.strapiService.updateData(`teams/${id}`, updateTeamDto);
    } catch (error) {
      console.error('Error updating team:', error);
      throw new ForbiddenException(
        `You do not have permission to update team with ID ${id}`,
      );
    }
  }

  remove(id: number) {
    try {
      return this.strapiService.deleteData(`teams/${id}`);
    } catch (error) {
      console.error('Error deleting team:', error);
      throw new ForbiddenException(
        `You do not have permission to delete team with ID ${id}`,
      );
    }
  }
}
