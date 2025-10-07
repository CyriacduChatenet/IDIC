import { Injectable } from '@nestjs/common';
import { CreateClubDto } from './dto/create-club.dto';
import { UpdateClubDto } from './dto/update-club.dto';
import { StrapiService } from '../strapi/strapi.service';

@Injectable()
export class ClubService {
  constructor(private readonly strapiService: StrapiService) {}

  create(createClubDto: CreateClubDto) {
    return this.strapiService.postData('clubs', createClubDto);
  }

  findAll() {
    return this.strapiService.getAllData('clubs');
  }

  findOne(id: number) {
    return this.strapiService.getDataById('clubs', id);
  }

  update(id: number, updateClubDto: UpdateClubDto) {
    return this.strapiService.updateData(`clubs/${id}`, updateClubDto);
  }

  remove(id: number) {
    return this.strapiService.deleteData(`clubs/${id}`);
  }
}
