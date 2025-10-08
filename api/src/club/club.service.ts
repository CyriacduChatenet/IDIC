import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateClubDto } from './dto/create-club.dto';
import { UpdateClubDto } from './dto/update-club.dto';
import { StrapiService } from '../strapi/strapi.service';

@Injectable()
export class ClubService {
  constructor(private readonly strapiService: StrapiService) {}

  create(createClubDto: CreateClubDto) {
    try {
      return this.strapiService.postData('clubs', createClubDto);
    } catch (error) {
      console.error('Error creating club:', error);
      throw new ForbiddenException(
        'You do not have permission to create a club',
      );
    }
  }

  findAll() {
    try {
      return this.strapiService.getAllData('clubs');
    } catch (error) {
      console.error('Error fetching clubs:', error);
      throw new NotFoundException('No clubs found');
    }
  }

  findOne(id: number) {
    try {
      return this.strapiService.getDataById('clubs', id);
    } catch (error) {
      console.error('Error fetching club:', error);
      throw new NotFoundException(`Club with ID ${id} not found`);
    }
  }

  update(id: number, updateClubDto: UpdateClubDto) {
    try {
      return this.strapiService.updateData(`clubs/${id}`, updateClubDto);
    } catch (error) {
      console.error('Error updating club:', error);
      throw new ForbiddenException(`Club with ID ${id} not found`);
    }
  }

  remove(id: number) {
    try {
      return this.strapiService.deleteData(`clubs/${id}`);
    } catch (error) {
      console.error('Error deleting club:', error);
      throw new ForbiddenException(`Club with ID ${id} not found`);
    }
  }
}
