import { User } from '../../user/entity/user.entity';

export interface AuthDataResponse {
  jwt: string;
  user: User;
}
