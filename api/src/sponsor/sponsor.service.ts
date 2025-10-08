import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateSponsorDto } from './dto/create-sponsor.dto';
import { UpdateSponsorDto } from './dto/update-sponsor.dto';
import { StrapiService } from '../strapi/strapi.service';

@Injectable()
export class SponsorService {
  constructor(private readonly strapiService: StrapiService) {}

  create(createSponsorDto: CreateSponsorDto) {
    try {
      return this.strapiService.postData('sponsors', createSponsorDto);
    } catch (error) {
      console.error('Error creating sponsor:', error);
      throw new ForbiddenException(
        'You do not have permission to create a sponsor',
      );
    }
  }

  findAll() {
    try {
      return this.strapiService.getAllData('sponsors');
    } catch (error) {
      console.error('Error fetching sponsors:', error);
      throw new NotFoundException('No sponsors found');
    }
  }

  findOne(id: number) {
    try {
      return this.strapiService.getDataById('sponsors', id);
    } catch (error) {
      console.error('Error fetching sponsor:', error);
      throw new NotFoundException(`Sponsor with ID ${id} not found`);
    }
  }

  update(id: number, updateSponsorDto: UpdateSponsorDto) {
    try {
      return this.strapiService.updateData(`sponsors/${id}`, updateSponsorDto);
    } catch (error) {
      console.error('Error updating sponsor:', error);
      throw new ForbiddenException(
        `You do not have permission to update sponsor with ID ${id}`,
      );
    }
  }

  remove(id: number) {
    try {
      return this.strapiService.deleteData(`sponsors/${id}`);
    } catch (error) {
      console.error('Error deleting sponsor:', error);
      throw new ForbiddenException(
        `You do not have permission to delete sponsor with ID ${id}`,
      );
    }
  }
}
