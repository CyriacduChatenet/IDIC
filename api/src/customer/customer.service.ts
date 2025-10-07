import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { StrapiService } from '../strapi/strapi.service';

@Injectable()
export class CustomerService {
  constructor(private readonly strapiService: StrapiService) {}

  create(createCustomerDto: CreateCustomerDto) {
    return this.strapiService.postData('customers', createCustomerDto);
  }

  findAll() {
    return this.strapiService.getAllData('customers');
  }

  findOne(id: number) {
    return this.strapiService.getDataById(`customers/`, id);
  }

  update(id: number, updateCustomerDto: UpdateCustomerDto) {
    return this.strapiService.updateData(`customers/${id}`, updateCustomerDto);
  }

  remove(id: number) {
    return this.strapiService.deleteData(`customers/${id}`);
  }
}
