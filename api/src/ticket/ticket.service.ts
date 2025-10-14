import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { StrapiService } from '../strapi/strapi.service';

@Injectable()
export class TicketService {
  constructor(private readonly strapiService: StrapiService) {}

  create(createTicketDto: CreateTicketDto) {
    try {
      return this.strapiService.postData('tickets', { data: createTicketDto });
    } catch (err) {
      console.error('Error creating ticket:', err);
      throw new ForbiddenException(
        `You do not have PERMISSION to create a STRAPI_TICKET`,
      );
    }
  }

  findAll() {
    try {
      return this.strapiService.getAllData('tickets', '*');
    } catch (err) {
      console.error('Error fetching tickets:', err);
      throw new NotFoundException(`No STRAPI_TICKETS found`);
    }
  }

  findOne(id: string) {
    try {
      return this.strapiService.getDataById(`tickets/${id}`, '*');
    } catch (err) {
      console.error('Error fetching ticket:', err);
      throw new NotFoundException(`STRAPI_TICKET with ID ${id} not found`);
    }
  }

  update(id: string, updateTicketDto: UpdateTicketDto) {
    try {
      return this.strapiService.updateData(`tickets/${id}`, {
        data: updateTicketDto,
      });
    } catch (err) {
      console.error('Error updating ticket:', err);
      throw new ForbiddenException(
        `You do not have permission to update STRAPI_TICKET with ID ${id} and CRDENTIALS ${JSON.stringify(updateTicketDto)}`,
      );
    }
  }

  remove(id: string) {
    try {
      return this.strapiService.deleteData(`tickets/${id}`);
    } catch (err) {
      console.error('Error deleting ticket:', err);
      throw new ForbiddenException(
        `You do not have permission to delete STRAPI_TICKET with ID ${id}`,
      );
    }
  }
}
