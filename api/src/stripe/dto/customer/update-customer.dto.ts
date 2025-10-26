import { PartialType } from '@nestjs/mapped-types';

import { CreateStripeCustomerDto } from './create-customer.dto';

export class UpdateStripeCustomerDto extends PartialType(
  CreateStripeCustomerDto,
) {}
