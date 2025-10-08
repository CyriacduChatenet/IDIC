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
      return this.strapiService.postData('players', createPlayerDto);
    } catch (error) {
      console.error('Error creating player:', error);
      throw new ForbiddenException(
        'You do not have permission to create a player',
      );
    }
  }

  findAll() {
    try {
      return this.strapiService.getAllData('players');
    } catch (error) {
      console.error('Error fetching players:', error);
      throw new NotFoundException('No players found');
    }
  }

  findOne(id: number) {
    try {
      return this.strapiService.getDataById('players', id);
    } catch (error) {
      console.error('Error fetching player:', error);
      throw new NotFoundException(`Player with ID ${id} not found`);
    }
  }

  update(id: number, updatePlayerDto: UpdatePlayerDto) {
    try {
      return this.strapiService.updateData(`players/${id}`, updatePlayerDto);
    } catch (error) {
      console.error('Error updating player:', error);
      throw new ForbiddenException(
        `You do not have permission to update player with ID ${id}`,
      );
    }
  }

  remove(id: number) {
    try {
      return this.strapiService.deleteData(`players/${id}`);
    } catch (error) {
      console.error('Error deleting player:', error);
      throw new ForbiddenException(
        `You do not have permission to delete player with ID ${id}`,
      );
    }
  }
}
