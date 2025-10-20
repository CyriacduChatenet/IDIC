import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { StrapiService } from '../strapi/strapi.service';
import {
  StrapiApiCreateResponse,
  StrapiApiDeleteResponse,
  StrapiApiFindAllResponse,
  StrapiApiFindOneResponse,
  StrapiApiUpdateResponse,
} from 'src/config/interfaces/strapi-api-response.interface';
import { Player } from './entity/player.entity';

@Injectable()
export class PlayerService {
  constructor(private readonly strapiService: StrapiService) {}

  create(
    createPlayerDto: CreatePlayerDto,
  ): Promise<StrapiApiCreateResponse<Player>> {
    try {
      return this.strapiService.postData('players', { data: createPlayerDto });
    } catch (err) {
      console.error('Error creating player:', err);
      throw new ForbiddenException(
        `You do not have PERMISSION to create a STRAPI_PLAYER`,
      );
    }
  }

  findAll(): Promise<StrapiApiFindAllResponse<Player>> {
    try {
      return this.strapiService.getAllData('players');
    } catch (err) {
      console.error('Error fetching players:', err);
      throw new NotFoundException(`No STRAPI_PLAYERS found`);
    }
  }

  findOne(id: string): Promise<StrapiApiFindOneResponse<Player>> {
    try {
      return this.strapiService.getDataById(`players/${id}`);
    } catch (err) {
      console.error('Error fetching player:', err);
      throw new NotFoundException(`STRAPI_PLAYER with ID ${id} not found`);
    }
  }

  update(
    id: string,
    updatePlayerDto: UpdatePlayerDto,
  ): Promise<StrapiApiUpdateResponse<Player>> {
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

  async remove(id: string): Promise<StrapiApiDeleteResponse<Player>> {
    try {
      const player = await this.findOne(id);
      await this.strapiService.deleteData(`players/${id}`);

      return { data: player.data };
    } catch (err) {
      console.error('Error deleting player:', err);
      throw new ForbiddenException(
        `You do not have permission to delete STRAPI_PLAYER with ID ${id}`,
      );
    }
  }
}
