import { Injectable } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { StrapiService } from 'src/strapi/strapi.service';

@Injectable()
export class EventService {
  constructor(private readonly strapiService: StrapiService) {}

  create(createEventDto: CreateEventDto) {
    return this.strapiService.postData('events', createEventDto);
  }

  findAll() {
    return this.strapiService.getAllData('events');
  }

  findOne(id: number) {
    return this.strapiService.getDataById('events', id);
  }

  update(id: number, updateEventDto: UpdateEventDto) {
    return this.strapiService.updateData(`events/${id}`, updateEventDto);
  }

  remove(id: number) {
    return this.strapiService.deleteData(`events/${id}`);
  }
}
