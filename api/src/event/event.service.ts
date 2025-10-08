import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { StrapiService } from 'src/strapi/strapi.service';

@Injectable()
export class EventService {
  constructor(private readonly strapiService: StrapiService) {}

  create(createEventDto: CreateEventDto) {
    try {
      return this.strapiService.postData('events', createEventDto);
    } catch (error) {
      console.error('Error creating event:', error);
      throw new ForbiddenException(
        'You do not have permission to create an event',
      );
    }
  }

  findAll() {
    try {
      return this.strapiService.getAllData('events');
    } catch (error) {
      console.error('Error fetching events:', error);
      throw new NotFoundException('No events found');
    }
  }

  findOne(id: number) {
    try {
      return this.strapiService.getDataById('events', id);
    } catch (error) {
      console.error('Error fetching event:', error);
      throw new NotFoundException(`Event with ID ${id} not found`);
    }
  }

  update(id: number, updateEventDto: UpdateEventDto) {
    try {
      return this.strapiService.updateData(`events/${id}`, updateEventDto);
    } catch (error) {
      console.error('Error updating event:', error);
      throw new ForbiddenException(
        `You do not have permission to update event with ID ${id}`,
      );
    }
  }

  remove(id: number) {
    try {
      return this.strapiService.deleteData(`events/${id}`);
    } catch (error) {
      console.error('Error deleting event:', error);
      throw new ForbiddenException(
        `You do not have permission to delete event with ID ${id}`,
      );
    }
  }
}
