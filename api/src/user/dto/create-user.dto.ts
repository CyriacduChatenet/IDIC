import { Role } from '../../config/enum/role.enum';

export class CreateUserDto {
  username: string;
  email: string;
  password: string;
  confirmed: boolean;
  blocked: boolean;
  role: Role;
  first_name?: string;
  last_name?: string;
  birth_date?: Date;
  address?: string;
  phone?: string;
  name?: string;
  description?: string;
}
