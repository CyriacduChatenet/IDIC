import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { StrapiService } from '../strapi/strapi.service';

@Injectable()
export class UserService {
  constructor(private readonly strapiService: StrapiService) {}

  create(createUserDto: CreateUserDto) {
    try {
      return this.strapiService.postData('users', createUserDto);
    } catch (error) {
      console.error('Error creating user:', error);
      throw new ForbiddenException(
        'You do not have permission to create a user',
      );
    }
  }

  findAll() {
    try {
      return this.strapiService.getAllData('users', '*');
    } catch (error) {
      console.error('Error fetching users:', error);
      throw new NotFoundException('No users found');
    }
  }

  findOne(id: number) {
    try {
      return this.strapiService.getDataById('users', id);
    } catch (error) {
      console.error('Error fetching user:', error);
      throw new NotFoundException(`User with ID ${id} not found`);
    }
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    try {
      return this.strapiService.updateData(`users/${id}`, updateUserDto);
    } catch (error) {
      console.error('Error updating user:', error);
      throw new ForbiddenException(
        `You do not have permission to update user with ID ${id}`,
      );
    }
  }

  remove(id: number) {
    try {
      return this.strapiService.deleteData(`users/${id}`);
    } catch (error) {
      console.error('Error deleting user:', error);
      throw new ForbiddenException(
        `You do not have permission to delete user with ID ${id}`,
      );
    }
  }
}
