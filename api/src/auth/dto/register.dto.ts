import { Permission } from '../../config/enum/permission.enum';

export class RegisterDto {
  username: string;
  email: string;
  password: string;
  confirmed: boolean;
  blocked: boolean;
  permission: Permission;
  role: 1;
}
