import { Injectable } from '@nestjs/common';

import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { StrapiService } from '../strapi/strapi.service';
import {
  StrapiApiCreateResponse,
  StrapiApiDeleteResponse,
  StrapiApiFindAllResponse,
  StrapiApiFindOneResponse,
  StrapiApiUpdateResponse,
} from 'src/strapi/interfaces/strapi-api-response.interface';
import { Player } from './entity/player.entity';
import { handleAxiosError } from '../config/utils/axios-error.utils';

@Injectable()
export class PlayerService {
  constructor(private readonly strapiService: StrapiService) {}

  create(
    createPlayerDto: CreatePlayerDto,
  ): Promise<StrapiApiCreateResponse<Player>> {
    try {
      return this.strapiService.postData('players', { data: createPlayerDto });
    } catch (err) {
      handleAxiosError(err, 'creating player');
    }
  }

  findAll(): Promise<StrapiApiFindAllResponse<Player>> {
    try {
      return this.strapiService.getAllData('players');
    } catch (err) {
      handleAxiosError(err, 'fetching players');
    }
  }

  findOne(id: string): Promise<StrapiApiFindOneResponse<Player>> {
    try {
      return this.strapiService.getDataById(`players/${id}`);
    } catch (err) {
      handleAxiosError(err, `fetching player with ID ${id}`);
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
      handleAxiosError(err, `updating player with ID ${id}`);
    }
  }

  async remove(id: string): Promise<StrapiApiDeleteResponse<Player>> {
    try {
      const player = await this.findOne(id);
      await this.strapiService.deleteData(`players/${id}`);

      return { data: player.data };
    } catch (err) {
      handleAxiosError(err, `deleting player with ID ${id}`);
    }
  }
}
