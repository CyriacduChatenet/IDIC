import { Injectable } from '@nestjs/common';
import { CreateSponsorDto } from './dto/create-sponsor.dto';
import { UpdateSponsorDto } from './dto/update-sponsor.dto';
import { StrapiService } from '../strapi/strapi.service';

@Injectable()
export class SponsorService {
  constructor(private readonly strapiService: StrapiService) {}

  create(createSponsorDto: CreateSponsorDto) {
    return this.strapiService.postData('sponsors', createSponsorDto);
  }

  findAll() {
    return this.strapiService.getAllData('sponsors');
  }

  findOne(id: number) {
    return this.strapiService.getDataById('sponsors', id);
  }

  update(id: number, updateSponsorDto: UpdateSponsorDto) {
    return this.strapiService.updateData(`sponsors/${id}`, updateSponsorDto);
  }

  remove(id: number) {
    return this.strapiService.deleteData(`sponsors/${id}`);
  }
}
