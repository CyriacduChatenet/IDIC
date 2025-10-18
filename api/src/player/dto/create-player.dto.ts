import { PartialType } from '@nestjs/mapped-types';

import { CreateUserDto } from '../../user/dto/create-user.dto';

export class CreatePlayerDto extends PartialType(CreateUserDto) {
  first_name: string;
  last_name: string;
  birth_date: Date;
  address: string;
  phone: string;
}
