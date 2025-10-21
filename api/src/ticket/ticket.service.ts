import { Injectable } from '@nestjs/common';

import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { StrapiService } from '../strapi/strapi.service';
import {
  StrapiApiCreateResponse,
  StrapiApiDeleteResponse,
  StrapiApiFindAllResponse,
  StrapiApiFindOneResponse,
  StrapiApiUpdateResponse,
} from 'src/strapi/interfaces/strapi-api-response.interface';
import { Ticket } from './entities/ticket.entity';
import { handleAxiosError } from '../config/utils/axios-error.util';

@Injectable()
export class TicketService {
  constructor(private readonly strapiService: StrapiService) {}

  create(
    createTicketDto: CreateTicketDto,
  ): Promise<StrapiApiCreateResponse<Ticket>> {
    try {
      return this.strapiService.postData('tickets', { data: createTicketDto });
    } catch (err) {
      handleAxiosError(err, 'creating ticket');
    }
  }

  findAll(): Promise<StrapiApiFindAllResponse<Ticket>> {
    try {
      return this.strapiService.getAllData('tickets', '*');
    } catch (err) {
      handleAxiosError(err, 'fetching tickets');
    }
  }

  findOne(id: string): Promise<StrapiApiFindOneResponse<Ticket>> {
    try {
      return this.strapiService.getDataById(`tickets/${id}`, '*');
    } catch (err) {
      handleAxiosError(err, `fetching ticket with ID ${id}`);
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
      handleAxiosError(err, `updating ticket with ID ${id}`);
    }
  }

  async remove(id: string): Promise<StrapiApiDeleteResponse<Ticket>> {
    try {
      const ticket = await this.findOne(id);
      await this.strapiService.deleteData(`tickets/${ticket.data.id}`);
      return { data: ticket.data };
    } catch (err) {
      handleAxiosError(err, `deleting ticket with ID ${id}`);
    }
  }
}
