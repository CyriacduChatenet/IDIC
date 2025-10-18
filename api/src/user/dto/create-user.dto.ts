import { Permission } from '../../config/enum/permission.enum';

export class CreateUserDto {
  username: string;
  email: string;
  password: string;
  confirmed: boolean;
  blocked: boolean;
  permission: Permission;

  name: string;
  address: string;
  phone: string;
  logo?: string;

  first_name: string;
  last_name: string;
  birth_date: Date;

  description?: string;
}
