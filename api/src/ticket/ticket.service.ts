import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { StrapiService } from '../strapi/strapi.service';
import {
  StrapiApiCreateResponse,
  StrapiApiDeleteResponse,
  StrapiApiFindAllResponse,
  StrapiApiFindOneResponse,
  StrapiApiUpdateResponse,
} from 'src/config/interfaces/strapi-api-response.interface';
import { Ticket } from './entities/ticket.entity';

@Injectable()
export class TicketService {
  constructor(private readonly strapiService: StrapiService) {}

  create(
    createTicketDto: CreateTicketDto,
  ): Promise<StrapiApiCreateResponse<Ticket>> {
    try {
      return this.strapiService.postData('tickets', { data: createTicketDto });
    } catch (err) {
      console.error('Error creating ticket:', err);
      throw new ForbiddenException(
        `You do not have PERMISSION to create a STRAPI_TICKET`,
      );
    }
  }

  findAll(): Promise<StrapiApiFindAllResponse<Ticket>> {
    try {
      return this.strapiService.getAllData('tickets', '*');
    } catch (err) {
      console.error('Error fetching tickets:', err);
      throw new NotFoundException(`No STRAPI_TICKETS found`);
    }
  }

  findOne(id: string): Promise<StrapiApiFindOneResponse<Ticket>> {
    try {
      return this.strapiService.getDataById(`tickets/${id}`, '*');
    } catch (err) {
      console.error('Error fetching ticket:', err);
      throw new NotFoundException(`STRAPI_TICKET with ID ${id} not found`);
    }
  }

  update(
    id: string,
    updateTicketDto: UpdateTicketDto,
  ): Promise<StrapiApiUpdateResponse<Ticket>> {
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

  async remove(id: string): Promise<StrapiApiDeleteResponse<Ticket>> {
    try {
      const ticket = await this.findOne(id);
      await this.strapiService.deleteData(`tickets/${ticket.data.id}`);
      return { data: ticket.data };
    } catch (err) {
      console.error('Error deleting ticket:', err);
      throw new ForbiddenException(
        `You do not have permission to delete STRAPI_TICKET with ID ${id}`,
      );
    }
  }
}
