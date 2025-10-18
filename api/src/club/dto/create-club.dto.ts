import { PartialType } from '@nestjs/mapped-types';

import { CreateUserDto } from '../../user/dto/create-user.dto';

export class CreateClubDto extends PartialType(CreateUserDto) {
  name: string;
  address: string;
  phone: string;
  logo?: string;
}
