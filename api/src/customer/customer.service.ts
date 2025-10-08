import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { StrapiService } from '../strapi/strapi.service';

@Injectable()
export class CustomerService {
  constructor(private readonly strapiService: StrapiService) {}

  create(createCustomerDto: CreateCustomerDto) {
    try {
      return this.strapiService.postData('customers', createCustomerDto);
    } catch (error) {
      console.error('Error creating customer:', error);
      throw new ForbiddenException(
        'You do not have permission to create a customer',
      );
    }
  }

  findAll() {
    try {
      return this.strapiService.getAllData('customers');
    } catch (error) {
      console.error('Error fetching customers:', error);
      throw new NotFoundException(
        'You do not have permission to access customers',
      );
    }
  }

  findOne(id: number) {
    try {
      return this.strapiService.getDataById(`customers/`, id);
    } catch (error) {
      console.error('Error fetching customer:', error);
      throw new NotFoundException(`Customer with ID ${id} not found`);
    }
  }

  update(id: number, updateCustomerDto: UpdateCustomerDto) {
    try {
      return this.strapiService.updateData(
        `customers/${id}`,
        updateCustomerDto,
      );
    } catch (error) {
      console.error('Error updating customer:', error);
      throw new ForbiddenException(
        `You do not have permission to update customer with ID ${id}`,
      );
    }
  }

  remove(id: number) {
    try {
      return this.strapiService.deleteData(`customers/${id}`);
    } catch (error) {
      console.error('Error deleting customer:', error);
      throw new ForbiddenException(
        `You do not have permission to delete customer with ID ${id}`,
      );
    }
  }
}
