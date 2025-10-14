import { PartialType } from '@nestjs/mapped-types';

import { CreateClubDto } from './create-club.dto';
import { Event } from '../../event/entities/event.entity';

export class UpdateClubDto extends PartialType(CreateClubDto) {
  events?: string[];
}
