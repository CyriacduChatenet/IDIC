import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { StrapiService } from 'src/strapi/strapi.service';

@Injectable()
export class UserService {
  constructor(private readonly strapiService: StrapiService) {}

  create(createUserDto: CreateUserDto) {
    return this.strapiService.postData('users', createUserDto);
  }

  findAll() {
    return this.strapiService.getAllData('users');
  }

  findOne(id: number) {
    return this.strapiService.getDataById('users', id);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.strapiService.updateData(`users/${id}`, updateUserDto);
  }

  remove(id: number) {
    return this.strapiService.deleteData(`users/${id}`);
  }
}
