import { Role } from '../../config/enum/role.enum';

export class CreateUserDto {
  id?: number;
  username: string;
  email: string;
  password: string;
  confirmed: boolean;
  blocked: boolean;
  role: Role;
}
