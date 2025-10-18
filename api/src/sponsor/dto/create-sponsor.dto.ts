import { PartialType } from '@nestjs/mapped-types';

import { CreateUserDto } from '../../user/dto/create-user.dto';

export class CreateSponsorDto extends PartialType(CreateUserDto) {
  name: string;
  logo?: string;
  address: string;
  description?: string;
  phone: string;
}
