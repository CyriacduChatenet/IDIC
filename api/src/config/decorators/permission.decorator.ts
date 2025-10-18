import { SetMetadata } from '@nestjs/common';

import { Permission } from '../enum/permission.enum';

export const Permissions = (...permissions: Permission[]) =>
  SetMetadata('permissions', permissions);
