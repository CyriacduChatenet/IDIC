import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { StrapiService } from '../strapi/strapi.service';

@Injectable()
export class PlayerService {
  constructor(private readonly strapiService: StrapiService) {}

  create(createPlayerDto: CreatePlayerDto) {
    try {
      return this.strapiService.postData('players', { data: createPlayerDto });
    } catch (err) {
      console.error('Error creating player:', err);
      throw new ForbiddenException(
        `You do not have PERMISSION to create a STRAPI_PLAYER`,
      );
    }
  }

  findAll() {
    try {
      return this.strapiService.getAllData('players');
    } catch (err) {
      console.error('Error fetching players:', err);
      throw new NotFoundException(`No STRAPI_PLAYERS found`);
    }
  }

  findOne(id: string) {
    try {
      return this.strapiService.getDataById(`players/${id}`);
    } catch (err) {
      console.error('Error fetching player:', err);
      throw new NotFoundException(`STRAPI_PLAYER with ID ${id} not found`);
    }
  }

  update(id: string, updatePlayerDto: UpdatePlayerDto) {
    try {
      return this.strapiService.updateData(`players/${id}`, {
        data: updatePlayerDto,
      });
    } catch (err) {
      console.error('Error updating player:', err);
      throw new ForbiddenException(
        `You do not have permission to update STRAPI_PLAYER with ID ${id} and CRDENTIALS ${JSON.stringify(updatePlayerDto)}`,
      );
    }
  }

  remove(id: string) {
    try {
      return this.strapiService.deleteData(`players/${id}`);
    } catch (err) {
      console.error('Error deleting player:', err);
      throw new ForbiddenException(
        `You do not have permission to delete STRAPI_PLAYER with ID ${id}`,
      );
    }
  }
}
