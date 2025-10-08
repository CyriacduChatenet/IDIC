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
      return this.strapiService.postData('tickets', createTicketDto);
    } catch (error) {
      console.error('Error creating ticket:', error);
      throw new ForbiddenException(
        'You do not have permission to create a ticket',
      );
    }
  }

  findAll() {
    try {
      return this.strapiService.getAllData('tickets');
    } catch (error) {
      console.error('Error fetching tickets:', error);
      throw new NotFoundException('No tickets found');
    }
  }

  findOne(id: number) {
    try {
      return this.strapiService.getDataById('tickets', id);
    } catch (error) {
      console.error('Error fetching ticket:', error);
      throw new NotFoundException(`Ticket with ID ${id} not found`);
    }
  }

  update(id: number, updateTicketDto: UpdateTicketDto) {
    try {
      return this.strapiService.updateData(`tickets/${id}`, updateTicketDto);
    } catch (error) {
      console.error('Error updating ticket:', error);
      throw new ForbiddenException(
        `You do not have permission to update ticket with ID ${id}`,
      );
    }
  }

  remove(id: number) {
    try {
      return this.strapiService.deleteData(`tickets/${id}`);
    } catch (error) {
      console.error('Error deleting ticket:', error);
      throw new ForbiddenException(
        `You do not have permission to delete ticket with ID ${id}`,
      );
    }
  }
}
