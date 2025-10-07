import { Injectable } from '@nestjs/common';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { StrapiService } from '../strapi/strapi.service';

@Injectable()
export class TicketService {
  constructor(private readonly strapiService: StrapiService) {}

  create(createTicketDto: CreateTicketDto) {
    return this.strapiService.postData('tickets', createTicketDto);
  }

  findAll() {
    return this.strapiService.getAllData('tickets');
  }

  findOne(id: number) {
    return this.strapiService.getDataById('tickets', id);
  }

  update(id: number, updateTicketDto: UpdateTicketDto) {
    return this.strapiService.updateData(`tickets/${id}`, updateTicketDto);
  }

  remove(id: number) {
    return this.strapiService.deleteData(`tickets/${id}`);
  }
}
