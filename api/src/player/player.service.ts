import { Injectable } from '@nestjs/common';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { StrapiService } from '../strapi/strapi.service';

@Injectable()
export class PlayerService {
  constructor(private readonly strapiService: StrapiService) {}

  create(createPlayerDto: CreatePlayerDto) {
    return this.strapiService.postData('players', createPlayerDto);
  }

  findAll() {
    return this.strapiService.getAllData('players');
  }

  findOne(id: number) {
    return this.strapiService.getDataById('players', id);
  }

  update(id: number, updatePlayerDto: UpdatePlayerDto) {
    return this.strapiService.updateData(`players/${id}`, updatePlayerDto);
  }

  remove(id: number) {
    return this.strapiService.deleteData(`players/${id}`);
  }
}
