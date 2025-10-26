import { PartialType } from '@nestjs/mapped-types';

import { CreateStripeProductDto } from './create-product.dto';

export class UpdateStripeProductDto extends PartialType(
  CreateStripeProductDto,
) {}
